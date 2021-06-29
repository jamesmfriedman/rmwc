import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { IconButton } from '.';

export default function Readme() {
  return (
    <Docs
      title="Icon Buttons"
      lead="Icon buttons allow users to take actions, and make choices, with a single tap."
      module="@rmwc/icon-button"
      styles={[
        '@material/icon-button/dist/mdc.icon-button.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/buttons/icon-buttons/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        `IconButton` inherits from the `Icon` component and can be passed icons
        in the same way.
      </DocsP>

      <DocsExample label="Default">
        <>
          <IconButton icon="star" label="Rate this!" />

          <IconButton icon="favorite" label="Favorite" disabled />

          <IconButton
            icon="images/icons/twitter.png"
            aria-label="Tweet it!"
            tag="a"
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              'You should definitely be using RMWC for your next project! https://rmwc.io'
            )}`}
          />
        </>
      </DocsExample>

      <DocsSubtitle>Usage as a Toggle</DocsSubtitle>
      <DocsP>
        To use as a toggle, specify an additional toggled on state using
        'onIcon'.
      </DocsP>

      <DocsExample label="Uncontrolled">
        <>
          <IconButton icon="favorite_border" onIcon="favorite" />
          <IconButton icon="favorite" onIcon="favorite" disabled />
        </>
      </DocsExample>

      <DocsExample label="Controlled">
        {function Controlled() {
          const [isChecked, setIsChecked] = React.useState(false);
          return (
            <>
              <IconButton
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                onIcon="star"
                icon="star_border"
              />

              <IconButton
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                onIcon="images/icons/twitter.png"
                icon="images/icons/facebook.png"
              />
            </>
          );
        }}
      </DocsExample>

      <DocsExample label="Component as Icon">
        <IconButton
          onIcon={
            <div
              style={{
                background: 'red',
                width: '24px',
                height: '24px'
              }}
            />
          }
          icon={
            <div
              style={{
                background: 'green',
                width: '24px',
                height: '24px',
                borderRadius: '50%'
              }}
            />
          }
        />
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'IconButton', component: IconButton }]}
      />
    </Docs>
  );
}

export const galleryExample = <IconButton icon="favorite_outlined" />;
