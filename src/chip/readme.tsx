import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Chip, ChipSet } from '.';

export default function Readme() {
  return (
    <Docs
      title="Chips"
      lead="Chips represent complex entities in small blocks, such as a contact."
      module="@rmwc/chip"
      styles={[
        '@material/chips/dist/mdc.chips.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/chips/"
      examples={examples}
    >
      <DocsExample label="Default">
        <ChipSet>
          <Chip selected label="Cookies" />
          <Chip label="Pizza" />
          <Chip label="Icecream" />
        </ChipSet>
      </DocsExample>
      <DocsExample label="With Icons">
        <ChipSet>
          <Chip icon="favorite" label="Cookies" trailingIcon="close" />
        </ChipSet>
      </DocsExample>
      <DocsExample label="Event Handling">
        {function Example() {
          const [selected, setSelected] = React.useState(false);
          return (
            <ChipSet>
              <Chip
                key="my-chip"
                label="Click Me"
                checkmark
                selected={selected}
                onRemove={(evt) => console.log('onRemove', evt.detail)}
                onInteraction={(evt) => {
                  console.log('onInteraction', evt.detail);
                  setSelected(!selected);
                }}
                onTrailingIconInteraction={(evt) =>
                  console.log('onTrailingIconIteraction', evt.detail)
                }
                trailingIcon="close"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Filter and Choice Chipsets</DocsSubtitle>
      <DocsP>
        You can specify a `ChipSet` as either a `filter` of `choice` which
        slightly changes the visual styling of selected chips. While
        `material-components-web` has some built in functionality for chip sets,
        it doesn't fit well with React's unidirectional data flow. It is
        recommended you use standard React patterns to store selected chips in
        your state and render them accordingly.
      </DocsP>
      <DocsP>
        Clicking on the trailing close icon will trigger a close animation and
        put the chip in an exited state, but it is up to you to remove component
        out from rendering. The you use the `onRemove` prop implement this
        behavior.
      </DocsP>

      <DocsExample label="Filter">
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: false,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            setSelected({
              ...selected,
              //@ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSet filter>
              <Chip
                selected={selected.cookies}
                checkmark
                onInteraction={() => toggleSelected('cookies')}
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                checkmark
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                checkmark
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocsExample label="Choice">
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: false,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            setSelected({
              ...selected,
              //@ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSet choice>
              <Chip
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Chip', component: Chip },
          { displayName: 'ChipSet', component: ChipSet }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = <Chip selected checkmark label="Cookies" />;
