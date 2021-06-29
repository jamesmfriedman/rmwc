import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { CircularProgress } from '.';

import { Button } from '../button';
import { List, SimpleListItem } from '../list';
import { Chip } from '../chip';

export default function Readme() {
  return (
    <Docs
      title="Circular Progress"
      lead="Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card."
      module="@rmwc/circular-progress"
      styles={['@rmwc/circular-progress/circular-progress.css']}
      examples={examples}
      addon
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>

      <DocsExample label="Indeterminate">
        <CircularProgress />
      </DocsExample>
      <DocsExample label="Progress">
        <>
          <CircularProgress progress={0.3} />
          <CircularProgress progress={0.6} />
          <CircularProgress progress={0.9} />
        </>
      </DocsExample>

      <DocsSubtitle>Sizing</DocsSubtitle>

      <DocsExample label="Sizes">
        <>
          <CircularProgress size="xsmall" />
          <CircularProgress size="small" />
          <CircularProgress size="medium" />
          <CircularProgress size="large" />
          <CircularProgress size="xlarge" />
          <CircularProgress size={72} />
        </>
      </DocsExample>

      <DocsSubtitle>Usage with other components</DocsSubtitle>

      <DocsExample>
        <>
          <Button
            icon={<CircularProgress theme="secondary" />}
            label="Cookies"
          />

          <List>
            <SimpleListItem graphic={<CircularProgress />} text="Pizza" />
            <SimpleListItem graphic="favorite" text="Icecream" />
          </List>

          <Chip icon={<CircularProgress />} label="Donuts" />
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'CircularProgress', component: CircularProgress }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    {[0.3, 0.6, 0.9].map((num) => (
      <CircularProgress
        key={num}
        style={{ margin: '0.4rem' }}
        progress={num}
        size="large"
      />
    ))}
  </>
);
