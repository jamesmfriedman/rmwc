import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Select } from '.';

export default function Readme() {
  return (
    <Docs
      title="Select Menus"
      lead="Menus display a list of choices on a transient sheet of material."
      module="@rmwc/select"
      styles={[
        '@rmwc/select/select.css',
        '@material/select/dist/mdc.select.css',
        '@material/floating-label/dist/mdc.floating-label.css',
        '@material/notched-outline/dist/mdc.notched-outline.css',
        '@material/line-ripple/dist/mdc.line-ripple.css',
        '@material/list/dist/mdc.list.css',
        '@material/menu/dist/mdc.menu.css',
        '@material/menu-surface/dist/mdc.menu-surface.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/input-controls/select-menus/"
      examples={examples}
    >
      <DocsSubtitle>Select Styles</DocsSubtitle>
      <DocsP>
        Selects come in three different styles: standard,outlined, and enhanced.
      </DocsP>

      <DocsExample label="Standard">
        <Select label="Standard" options={['Cookies', 'Pizza', 'Icecream']} />
      </DocsExample>

      <DocsExample label="Outlined">
        <Select
          label="Outlined"
          outlined
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>

      <DocsExample label="Enhanced">
        <Select
          label="Enhanced"
          enhanced
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>

      <DocsExample label="With Options">
        <Select
          label="With Icon"
          defaultValue="Pizza"
          helpText="Choose your favorite snack..."
          icon="favorite"
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>

      <DocsSubtitle>Validation</DocsSubtitle>
      <DocsExample label="Required">
        <Select
          label="Required"
          required
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>
      <DocsExample label="Invalid">
        <Select
          label="Invalid"
          invalid
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>
      <DocsExample label="Disabled">
        <Select
          label="Disabled"
          disabled
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>

      <DocsSubtitle>Controlled / Uncontrolled</DocsSubtitle>
      <DocsP>
        The Select component has the same behaviors as a native HTML select and
        be both controlled and uncontrolled.
      </DocsP>
      <DocsExample label="Controlled">
        {function () {
          const [value, setValue] = React.useState('Cookies');
          return (
            <Select
              label="Controlled"
              options={['Cookies', 'Pizza', 'Icecream']}
              value={value}
              onChange={(evt) => setValue(evt.currentTarget.value)}
            />
          );
        }}
      </DocsExample>
      <DocsExample label="Uncontrolled">
        <Select
          label="Uncontrolled"
          options={['Cookies', 'Pizza', 'Icecream']}
          defaultValue="Cookies"
          onChange={(evt) => console.log(evt.currentTarget.value)}
        />
      </DocsExample>

      <DocsSubtitle>Data Driven Selects</DocsSubtitle>
      <DocsP>
        To fit common use cases, RMWC Select provides a data driven method for
        rendering select menus. There are multiple formats you can pass data in,
        use the one that best fits your requirements. To make your label not
        float by default and to have an unselected blank value, set the
        `placeholder` prop to a blank string.
      </DocsP>

      <DocsExample label="Formatted Options">
        {function Example() {
          // A controlled select Using a formatted array of options
          const options = [
            {
              label: 'Cookies',
              value: '1'
            },
            {
              label: 'Pizza',
              value: '2',
              /** Any additional items will be passed to the
                 child ListItem as props */
              'aria-disabled': true,
              tabIndex: -1
            },
            {
              label: 'Icecream',
              value: '3'
            }
          ];

          return <Select label="Array" options={options} />;
        }}
      </DocsExample>

      <DocsExample label="Value => Label Map">
        <Select
          label="Object map"
          options={{ '1': 'Cookies', '2': 'Pizza', '3': 'Icecream' }}
        />
      </DocsExample>

      <DocsExample label="Array">
        <Select
          label="Simple Array"
          placeholder="-- Select One --"
          options={['Cookies', 'Pizza', 'Icecream']}
        />
      </DocsExample>

      <DocsSubtitle>Manually Building the List</DocsSubtitle>
      <DocsP>
        If you want full control over the child `ListItems`, you can manually
        build the list yourself.
      </DocsP>

      <DocsExample label="Manually Built">
        <Select label="Manual" defaultValue="Cookies">
          <option value="Cookies">Cookies</option>
          <option value="Pizza">Pizza</option>
          <option value="Icecream">Icecream</option>
        </Select>
      </DocsExample>

      <DocsSubtitle>Option Groups</DocsSubtitle>
      <DocsP>
        Both native and enhanced Selects can contain option groups. Just nest
        additional options arrays in your data.
      </DocsP>

      <DocsExample label="Option Groups: Formatted">
        <Select
          label="Formatted"
          enhanced
          options={[
            {
              label: 'Dinner',
              options: [
                {
                  label: 'Pizza',
                  value: '2'
                }
              ]
            },
            {
              label: 'Dessert',
              options: [
                {
                  label: 'Cookies',
                  value: '1'
                },

                {
                  label: 'Icecream',
                  value: '3'
                }
              ]
            }
          ]}
        />
      </DocsExample>
      <DocsExample label="Options Groups: Manually Built">
        <Select label="Manually Built">
          <optgroup label="Dinner">
            <option value="Pizza">Pizza</option>
          </optgroup>
          <optgroup label="Dessert">
            <option value="Cookies">Cookies</option>
            <option value="Icecream">Icecream</option>
          </optgroup>
        </Select>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Select', component: Select }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Select options={[]} placeholder="--Select One--" label="Favorite Food" />
);
