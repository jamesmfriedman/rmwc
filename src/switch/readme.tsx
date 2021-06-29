import React from 'react';

import { Docs, DocsExample, DocProps, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Switch } from '.';

export default function Readme() {
  return (
    <Docs
      title="Switches"
      lead="On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button."
      module="@rmwc/switch"
      styles={[
        '@material/switch/dist/mdc.switch.css',
        '@material/form-field/dist/mdc.form-field.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/switches/"
      examples={examples}
    >
      <DocsP>
        Switches are identical in function to the Checkbox component, they just
        present a different UI / UX paradigm.
      </DocsP>

      <DocsExample label="Uncontrolled">
        <Switch defaultChecked label="Pizza" />
      </DocsExample>
      <DocsExample label="Controlled">
        {function Example() {
          const [checked, setChecked] = React.useState(false);

          return (
            <Switch
              checked={checked}
              onChange={(evt) => setChecked(!!evt.currentTarget.checked)}
              label="Cookies"
            />
          );
        }}
      </DocsExample>

      <DocsExample label="Label as Child">
        <Switch>Icecream</Switch>
      </DocsExample>

      <DocsExample label="Disabled">
        <>
          <Switch disabled label="Disabled" />
          <Switch disabled defaultChecked label="Disabled" />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Switch', component: Switch }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <div style={{ marginBottom: '1rem' }}>
      <Switch checked />
    </div>
    <Switch />
  </>
);
