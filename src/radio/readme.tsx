import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Radio } from '.';

export default function Readme() {
  return (
    <Docs
      title="Radio Buttons"
      lead="Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side."
      module="@rmwc/radio"
      styles={[
        '@material/radio/dist/mdc.radio.css',
        '@material/form-field/dist/mdc.form-field.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/radio-buttons/"
      examples={examples}
    >
      <DocsSubtitle>Controlled Usage</DocsSubtitle>

      <DocsExample>
        {function Example() {
          const [value, setValue] = React.useState('cookies');

          return (
            <>
              <Radio
                value="cookies"
                checked={value === 'cookies'}
                onChange={(evt) => setValue(String(evt.currentTarget.value))}
              >
                Cookies
              </Radio>

              <Radio
                value="pizza"
                checked={value === 'pizza'}
                onChange={(evt) => setValue(String(evt.currentTarget.value))}
              >
                Pizza
              </Radio>

              <Radio
                value="icecream"
                checked={value === 'icecream'}
                onChange={(evt) => setValue(String(evt.currentTarget.value))}
              >
                Icecream
              </Radio>
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Uncontrolled Usage</DocsSubtitle>
      <DocsP>
        You can use Radio Buttons and receive change events without having to
        manually set the `checked` prop. Just give the Radio components the same
        `name`. This example also shows using the `label` prop instead of
        setting the label as a child.
      </DocsP>
      <DocsExample>
        <>
          <Radio
            label="Cookies"
            value="cookies"
            name="myRadioGroup"
            onChange={(evt) => console.log(evt.currentTarget.value)}
          />

          <Radio
            label="Pizza"
            value="pizza"
            name="myRadioGroup"
            onChange={(evt) => console.log(evt.currentTarget.value)}
          />

          <Radio
            label="Icecream"
            value="icecream"
            name="myRadioGroup"
            onChange={(evt) => console.log(evt.currentTarget.value)}
          />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Radio', component: Radio }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <Radio defaultChecked />
    <Radio />
  </>
);
