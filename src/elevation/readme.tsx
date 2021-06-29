import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Elevation } from '.';

export default function Readme() {
  return (
    <Docs
      title="Elevation"
      lead="Elevation is the relative distance between two surfaces along the z-axis."
      module="@rmwc/elevation"
      styles={['@material/elevation/dist/mdc.elevation.css']}
      docsLink="https://material.io/develop/web/components/elevation/"
      examples={examples}
    >
      <DocsExample label="Elevation">
        <>
          {Array(25)
            .fill(undefined)
            .map((val, i) => (
              <Elevation z={i} key={i}>
                {i}dp
              </Elevation>
            ))}
        </>
      </DocsExample>

      <DocsExample label="Transition">
        {function Example() {
          const [elevation, setElevation] = React.useState(0);

          return (
            <Elevation
              z={elevation}
              transition
              onMouseOver={() => setElevation(24)}
              onMouseOut={() => setElevation(0)}
            >
              Hover Me {elevation}dp
            </Elevation>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Wrapping Children</DocsSubtitle>
      <DocsP>
        You can avoid adding extra DOM nodes by using the `wrap` prop on
        elevation. This will apply the classes directly to the child component.
        Additionally, Elevation is simply a `className`, so you can achieve the
        same effect by adding `className="mdc-elevation--z15"`.
      </DocsP>

      <DocsExample>
        <Elevation z={21} wrap>
          <span>Wrapped!</span>
        </Elevation>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Elevation', component: Elevation }]}
      />
    </Docs>
  );
}

export const galleryExample = [2, 24].map((num) => (
  <Elevation
    key={num}
    z={num}
    style={{
      backgroundColor: 'var(--mdc-theme-primary)',
      width: '3rem',
      height: '3rem',
      lineHeight: '3rem',
      textAlign: 'center',
      margin: '0.5rem',
      borderRadius: '6px',
      display: 'inline-block'
    }}
  />
));
