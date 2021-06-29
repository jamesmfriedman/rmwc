import React from 'react';

import { Docs, DocsExample, DocProps } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Grid, GridCell, GridRow } from '.';

export default function Readme() {
  return (
    <Docs
      title="Layout Grid"
      lead="Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone."
      module="@rmwc/grid"
      styles={['@material/layout-grid/dist/mdc.layout-grid.css']}
      docsLink="https://material.io/develop/web/components/layout-grid/"
      examples={examples}
    >
      <DocsExample label="Standard Grid">
        <Grid>
          <GridCell span={4}>1</GridCell>
          <GridCell span={4}>2</GridCell>
          <GridCell span={4}>3</GridCell>
        </Grid>
      </DocsExample>
      <DocsExample label="Sub Grids">
        <Grid>
          {/* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridRow components. */}
          <GridRow>
            <GridCell span={6}>1</GridCell>
            <GridCell span={6}>
              <GridRow>
                <GridCell span={6}>a</GridCell>
                <GridCell span={6}>b</GridCell>
              </GridRow>
            </GridCell>
          </GridRow>
        </Grid>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Grid', component: Grid },
          { displayName: 'GridCell', component: GridCell },
          { displayName: 'GridRow', component: GridRow }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Grid>
    {[1, 2, 3].map((num) => (
      <GridCell
        key={num}
        style={{
          textAlign: 'center',
          background: 'rgba(0,0,0,.1)',
          padding: '1rem 0'
        }}
        span={4}
      >
        {num}
      </GridCell>
    ))}
  </Grid>
);
