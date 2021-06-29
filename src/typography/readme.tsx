import React from 'react';

import { Docs, DocsP, DocsExample, DocProps, DocsSubtitle } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Typography } from '.';
import { RMWCProvider } from '../provider';

export default function Readme() {
  return (
    <Docs
      title="Typography"
      lead="Material Design’s text sizes and styles were developed to balance content density and reading comfort under typical usage conditions."
      module="@rmwc/typography"
      styles={['@material/typography/dist/mdc.typography.css']}
      docsLink="https://material.io/develop/web/components/typography/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsExample>
        <>
          <Typography use="headline1">headline1</Typography>
          <Typography use="headline2">headline2</Typography>
          <Typography use="headline3">headline3</Typography>
          <Typography use="headline4">headline4</Typography>
          <Typography use="headline5">headline5</Typography>
          <Typography use="headline6">headline6</Typography>
          <Typography use="subtitle1">subtitle1</Typography>
          <Typography use="subtitle2">subtitle2</Typography>
          <Typography use="body1">body1</Typography>
          <Typography use="body2">body2</Typography>
          <Typography use="caption">caption</Typography>
          <Typography use="button">button</Typography>
          <Typography use="overline">overline</Typography>
        </>
      </DocsExample>

      <DocsExample label="Specify tag">
        <Typography use="headline6" tag="h3">
          headline6
        </Typography>
      </DocsExample>

      <DocsSubtitle>Provider Setup</DocsSubtitle>
      <DocsP>
        You can globally map specify type classes to HTML tags for semantics, or
        specify a default to be used instead of `span`.
      </DocsP>

      <DocsExample label="Specify tag">
        <RMWCProvider
          typography={{
            /** Make all Typography components default to <div>  */
            defaultTag: 'div',
            /** Make headline5 <h5>  */
            headline5: 'h5',
            /** Make body2 <p>  */
            body2: 'p',
            /** Use your own component  */
            body1: ({ children, ...rest }) => (
              <span>
                <b>{children}!!!</b>
              </span>
            )
          }}
        >
          <Typography use="headline6">Rendered default `div`</Typography>
          <Typography use="headline5">Rendered with `h5`</Typography>
          <Typography use="body2">Rendered with `p`</Typography>
          <Typography use="body1">Custom rendering</Typography>
        </RMWCProvider>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Typography', component: Typography }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <div style={{ transform: 'scale(1.5)' }}>
    <Typography tag="div" use="headline6">
      headline6
    </Typography>
    <Typography tag="div" use="body1">
      body1
    </Typography>
    <Typography tag="div" use="caption">
      caption
    </Typography>
  </div>
);
