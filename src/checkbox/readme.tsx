import React from 'react';

import { Docs, DocsExample, DocProps } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Checkbox } from '.';

export default function Readme() {
  return (
    <Docs
      title="Checkboxes"
      lead="Checkboxes allow the user to select multiple options from a set."
      module="@rmwc/checkbox"
      styles={[
        '@material/checkbox/dist/mdc.checkbox.css',
        '@material/form-field/dist/mdc.form-field.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/checkboxes/"
      examples={examples}
    >
      <DocsExample label="Controlled">
        {function Example() {
          const [checked, setChecked] = React.useState(false);
          return (
            <Checkbox
              label="Cookies"
              checked={checked}
              onChange={(evt) => setChecked(!!evt.currentTarget.checked)}
            />
          );
        }}
      </DocsExample>
      <DocsExample label="Uncontrolled">
        <Checkbox label="Pizza" />
      </DocsExample>
      <DocsExample label="Label as Child">
        <Checkbox>Icecream</Checkbox>
      </DocsExample>
      <DocsExample label="States">
        <>
          <Checkbox label="Broccoli" indeterminate />

          <Checkbox label="Always On" checked />
          <Checkbox label="Always Off" checked={false} />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Checkbox', component: Checkbox }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <Checkbox defaultChecked />
    <Checkbox />
  </>
);
