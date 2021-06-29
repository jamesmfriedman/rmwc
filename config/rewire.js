process.env.REACT_EDITOR = 'vscode';

const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');

/***********************************
 * Utils
 ***********************************/
const publicPath = process.env.PUBLIC_PATH || '/';
const root = path.resolve(__dirname, '..');

// a simple utility to chain all of our config overrides together
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const getLoaderRoot = (config) => {
  const oneOf = config.module.rules.find((rule) => rule.oneOf);
  if (oneOf) {
    return oneOf.oneOf;
  } else {
    return config.module.rules;
  }
};

const addLoader = (config, rule) => {
  getLoaderRoot(config).unshift(rule);
  return config;
};

const addPlugin = (config, ...plugins) => {
  plugins.forEach((p) => {
    config.plugins.push(p);
  });
};

const getPlugin = (config, pluginName) =>
  config.plugins.find((p) => p.constructor.name === pluginName);

/***********************************
 * CRA Rewiring
 ***********************************/

/**
 * This adds aliases for the build ../../common -> common/
 */
const addAliases = (config) => {
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    rmwc: path.resolve(root, 'src'),
    '@rmwc': path.resolve(root, 'src'),
    '@doc-utils': path.resolve(root, 'src', 'doc-utils')
  };

  return config;
};

/***********************************
 * Jest Rewiring
 ***********************************/
/**
 * Add jest aliasing
 */
const jestModuleNameMapper = (config) => {
  config.moduleNameMapper = {
    ...config.moduleNameMapper,
    '@rmwc/(.*)$': '<rootDir>/src/$1'
  };
  return config;
};

/**
 * Add jest transforms
 */
const jestResolver = (config) => {
  config.resolver = './scripts/jest-resolver.js';
  return config;
};

const jestIgnore = (config) => {
  config.transformIgnorePatterns = ['<rootDir>/node_modules/'];
  return config;
};

const jestCoverage = (config) => {
  config.collectCoverageFrom = config.collectCoverageFrom.concat([
    '!src/base/utils/document-component.tsx',
    '!src/base/test-polyfill.js',
    '!src/index.tsx',
    '!src/setupTests.tsx',
    '!src/rmwc/**/*',
    '!src/**/*.story.*',
    '!src/**/*.spec.*',
    '!src/**/readme*',
    '!src/doc-utils*'
  ]);
  return config;
};

// Build the webpack config
module.exports = {
  webpack: (config, env) => {
    console.log(colors.magenta('Starting RMWC ❤️'));
    return pipe(addAliases, (config) => {
      return config;
    })(config);
  },
  storybook: (config, env) => pipe(addAliases)(config),
  jest: (config) => {
    return pipe(
      jestModuleNameMapper,
      jestResolver,
      jestCoverage,
      jestIgnore
    )(config);
  }
};
