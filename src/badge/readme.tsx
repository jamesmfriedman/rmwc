import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Badge, BadgeAnchor } from '.';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Avatar } from '../avatar';

export default function Readme() {
  return (
    <Docs
      title="Badges"
      lead="Badges are small status descriptors for UI elements. A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object."
      module="@rmwc/badge"
      styles={['@rmwc/badge/badge.css']}
      examples={examples}
      addon
    >
      <DocsExample label="Basic">
        <Badge align="inline" />
      </DocsExample>

      <DocsExample label="Labels">
        <>
          <Badge align="inline" label={20} />
          <Badge align="inline" label="99+" />
          <Badge align="inline" label="New" />
        </>
      </DocsExample>

      <DocsExample label="Theming">
        <>
          <Badge theme={['primaryBg', 'onPrimary']} align="inline" />
          <Badge style={{ background: 'hotpink' }} align="inline" />
          <Badge
            theme={['secondaryBg', 'onSecondary']}
            align="inline"
            label="Theme"
          />
        </>
      </DocsExample>

      <DocsSubtitle>Usage with other components</DocsSubtitle>
      <DocsP>
        The badge component has been designed to play well with the majority of
        components in RMWC. You can place it inside of any component that
        accepts children and its default position will be absolute to the top
        end corner.
      </DocsP>
      <DocsP>
        Because passing a Badge as a child doesn't always work (for things like
        `overflow: hidden` elements), you can use the `BadgeAnchor` component.
        This is really just a div with `position: relative` and some other
        sensible layout properties set on it, so you can use this or your own
        CSS to achieve the same result. Additionally, exact positioning is
        highly dependent on your design and shape of your components. Badges
        provide an `inset` property that allows you to adjust the positioning of
        the Badge as necessary.
      </DocsP>

      <DocsExample>
        <>
          <BadgeAnchor>
            <Button raised label="Button" />
            <Badge />
          </BadgeAnchor>

          <BadgeAnchor>
            <Button
              raised
              label="Button"
              theme={['secondaryBg', 'onSecondary']}
            />
            <Badge style={{ background: 'hotpink' }} label="Hello" />
          </BadgeAnchor>
        </>
      </DocsExample>

      <DocsExample>
        <BadgeAnchor>
          <IconButton icon="notifications" />
          <Badge inset="0.75rem" />
        </BadgeAnchor>
      </DocsExample>

      <DocsExample>
        <>
          <BadgeAnchor>
            <Avatar
              src="images/avatars/ironman.png"
              size="large"
              name="Tony Stark"
            />
            <Badge inset="5px" />
          </BadgeAnchor>

          <BadgeAnchor>
            <Avatar
              src="images/avatars/blackwidow.png"
              size="large"
              name="Natalia Alianovna Romanova"
              square
            />
            <Badge />
          </BadgeAnchor>
        </>
      </DocsExample>

      <DocsSubtitle>Alignment</DocsSubtitle>
      <DocsP>
        Badges can be aligned to the start, end, or use inline alignment. They
        are also RTL aware. They default to align end.
      </DocsP>

      <DocsExample center>
        <>
          <BadgeAnchor>
            <Button raised label="Align Start" />
            <Badge align="start" />
          </BadgeAnchor>

          <BadgeAnchor>
            <Button raised label="Align End" />
            <Badge align="end" />
          </BadgeAnchor>
        </>
      </DocsExample>

      <DocsSubtitle>Transitions</DocsSubtitle>
      <DocsP>
        You can transition between the standalone indicator and a badge with
        content. The badge will consider any `label` other than null or
        undefined as valid content.
      </DocsP>

      <DocsExample center>
        {function Example() {
          const [label, setLabel] = React.useState<any>(undefined);

          React.useEffect(() => {
            const timeout = setTimeout(() => {
              switch (label) {
                case '99+':
                  setLabel(undefined);
                  break;
                case '':
                  setLabel('99+');
                  break;
                case undefined:
                  setLabel('');
                  break;
              }
            }, 1800);

            return () => clearTimeout(timeout);
          }, [label]);

          return (
            <BadgeAnchor>
              <Button raised label="Button" />
              <Badge label={label} exited={label === undefined} />
            </BadgeAnchor>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Badge', component: Badge },
          { displayName: 'BadgeAnchor', component: BadgeAnchor }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <BadgeAnchor
    style={{
      width: '3rem',
      height: '3rem',
      border: '1px solid rgba(0,0,0,.33)',
      borderRadius: '0.5rem'
    }}
  >
    <Badge label="+99" />
  </BadgeAnchor>
);
