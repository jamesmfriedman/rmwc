import React from 'react';

import { Docs, DocsExample, DocProps, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Ripple } from '.';

export default function Readme() {
  return (
    <Docs
      title="Ripples"
      lead="MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material “ink ripple” interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements."
      module="@rmwc/ripple"
      styles={['@material/ripple/dist/mdc.ripple.css']}
      docsLink="https://material.io/develop/web/components/ripples/"
      examples={examples}
    >
      <DocsP>
        Ripples will wrap whatever child component you pass it and apply the
        appropriate classes and styles.
      </DocsP>
      <DocsExample>
        <Ripple>
          <p>Standard Ripple</p>
        </Ripple>
      </DocsExample>
      <DocsExample>
        <Ripple primary>
          <p>Primary</p>
        </Ripple>
      </DocsExample>
      <DocsExample>
        <Ripple accent>
          <p>Accent</p>
        </Ripple>
      </DocsExample>
      <DocsExample>
        <Ripple unbounded>
          <p>Unbounded</p>
        </Ripple>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Ripple', component: Ripple }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <Ripple unbounded>
      <p
        style={{
          width: '6rem',
          height: '6rem',
          lineHeight: '6rem',
          textAlign: 'center'
        }}
        className="mdc-ripple-upgraded--foreground-activation"
      >
        Ripple
      </p>
    </Ripple>
  </>
);
