import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { TextField } from '.';

export default function Readme() {
  return (
    <Docs
      title="Text Fields"
      lead="Text fields allow users to input, edit, and select text."
      module="@rmwc/textfield"
      styles={[
        '@material/textfield/dist/mdc.textfield.css',
        '@material/floating-label/dist/mdc.floating-label.css',
        '@material/notched-outline/dist/mdc.notched-outline.css',
        '@material/line-ripple/dist/mdc.line-ripple.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/icon/icon.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/text-field/"
      examples={examples}
    >
      <DocsSubtitle>TextField Variants</DocsSubtitle>

      <DocsExample label="Standard">
        <TextField label="standard..." />
      </DocsExample>
      <DocsExample label="Outlined">
        <TextField outlined label="outlined..." />
      </DocsExample>
      <DocsExample label="Full Width">
        <TextField fullwidth placeholder="fullWidth..." />
      </DocsExample>
      <DocsExample label="No Label">
        <TextField placeholder="No label" />
      </DocsExample>
      <DocsExample label="Icons">
        <>
          {/* Leading and trailing icons can be used.*/}
          <TextField icon="search" trailingIcon="close" label="icon..." />
          {/* If you need full control over the icon, you can pass the icon as options with your own props. Dont forget the TabIndex to make it clickable*/}
          <TextField
            label="trailingIcon..."
            trailingIcon={{
              icon: 'close',
              tabIndex: 0,
              onClick: () => console.log('Clear')
            }}
          />
        </>
      </DocsExample>

      <DocsSubtitle>Textareas</DocsSubtitle>
      <DocsP>
        You can make the TextField a textarea. Make sure to include `outlined`
        for proper styling You can optionally make help text always visible by
        passing an object as props with persistent set to true. Textareas can
        also have an optional character counter which will work with the
        maxLength property.
      </DocsP>
      <DocsExample>
        <TextField
          textarea
          outlined
          fullwidth
          label="textarea..."
          rows={8}
          maxLength={20}
          characterCount
          helpText={{
            persistent: true,
            validationMsg: true,
            children: 'The field is required'
          }}
        />
      </DocsExample>

      <DocsSubtitle>Validation</DocsSubtitle>
      <DocsExample label="Disabled">
        <TextField disabled label="Disabled..." />
      </DocsExample>
      <DocsExample label="Required">
        <TextField required label="Required..." value="" />
      </DocsExample>
      <DocsExample label="Invalid">
        <TextField
          invalid
          label="Invalid..."
          value="#@!$"
          onChange={() => {}}
        />
      </DocsExample>
      <DocsExample label="Validation Pattern">
        <TextField label="Validate Pattern" pattern="[A-Za-z]{3}" />
      </DocsExample>

      <DocsSubtitle>HTML Input Types</DocsSubtitle>
      <DocsP>
        A preview of how `material-components-web` handles styling input types
        for your browser.
      </DocsP>

      <DocsExample>
        <>
          <TextField label="text" type="text" />
          <TextField label="color" type="color" style={{ width: '6rem' }} />
          <TextField label="date" type="date" />
          <TextField label="datetime-local" type="datetime-local" />
          <TextField label="month" type="month" />
          <TextField label="range" type="range" />
          <TextField label="time" type="time" />
          <TextField label="week" type="week" />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'TextField', component: TextField }]}
      />
    </Docs>
  );
}

export const galleryExample = <TextField icon="search" placeholder="Search" />;
