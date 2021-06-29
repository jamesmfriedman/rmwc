import React from 'react';

import { Docs, DocsExample, DocProps } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { LinearProgress } from '.';

export default function Readme() {
  return (
    <Docs
      title="Linear Progress"
      lead="Progress and activity indicators are visual indications of an app loading content."
      module="@rmwc/linear-progress"
      styles={['@material/linear-progress/dist/mdc.linear-progress.css']}
      docsLink="https://material.io/develop/web/components/linear-progress/"
      examples={examples}
    >
      <DocsExample label="Default">
        <LinearProgress progress={0.5} />
      </DocsExample>

      <DocsExample label="Buffered">
        <LinearProgress progress={0.6} buffer={0.8} />
      </DocsExample>

      <DocsExample label="Indeterminate">
        <LinearProgress />
      </DocsExample>

      <DocsExample label="Reversed">
        <LinearProgress progress={0.2} reversed />
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'LinearProgress', component: LinearProgress }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <LinearProgress style={{ minWidth: '10rem' }} progress={0.6} />
);
