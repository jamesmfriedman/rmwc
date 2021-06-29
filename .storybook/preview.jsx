import React from 'react';
import '../src/rmwc/styles';
import { withKnobs } from '@storybook/addon-knobs';
import { Portal } from '@rmwc/base';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

const StylesDecorator = (storyFn) => (
  <div className="mdc-typography" style={{ padding: '24px', height: '100%' }}>
    <style>{`
    body {
      margin: 0;
    }
    
    `}</style>
    {storyFn()}
  </div>
);

const PortalDecorator = (storyFn) => (
  <>
    {storyFn()}
    <Portal />
  </>
);

export const decorators = [withKnobs, StylesDecorator, PortalDecorator];
