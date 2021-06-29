import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../src/rmwc/styles';
import { Portal } from '@rmwc/base';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../', true, /\.story\.(js|tsx)?$/));
}

const StylesDecorator = storyFn => (
  <div className="mdc-typography" style={{ padding: '24px', height: '100%' }}>
    <style>{`
    body {
      margin: 0;
    }
    
    `}</style>
    {storyFn()}
  </div>
);

const PortalDecorator = storyFn => (
  <>
    {storyFn()}
    <Portal />
  </>
);

addDecorator(withKnobs);
addDecorator(StylesDecorator);
addDecorator(PortalDecorator);

configure(loadStories, module);
