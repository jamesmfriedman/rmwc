import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { TextField } from './';

class TextFieldStory extends React.Component {
  state = {
    value: ''
  };

  onChange(evt) {
    this.setState({ value: evt.target.value });
    action('Value: ' + evt.target.value)();
  }

  render() {
    return (
      <TextField
        rows={number('rows', 8)}
        cols={number('cols', 0)}
        textarea={boolean('textarea', false)}
        disabled={boolean('disabled', false)}
        valid={boolean('valid', true)}
        value={text('value', this.state.value)}
        onChange={evt => this.onChange(evt)}
        label={text('label', 'Hello world')}
      />
    );
  }
}

storiesOf('Inputs and Controls', module).add('TextField', () => (
  <TextFieldStory />
));
