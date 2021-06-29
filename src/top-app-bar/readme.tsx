import React from 'react';

import { Docs, DocsExample, DocProps, DocsP, DocsSubtitle } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  SimpleTopAppBar
} from '.';

export default function Readme() {
  return (
    <Docs
      title="Top App Bar"
      lead="Top App Bar acts as a container for items such as application title, navigation icon, and action items."
      module="@rmwc/top-app-bar"
      styles={[
        '@material/top-app-bar/dist/mdc.top-app-bar.css',
        '@material/icon-button/dist/mdc.icon-button.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/icon/icon.css'
      ]}
      docsLink="https://material.io/develop/web/components/top-app-bar/"
      examples={examples}
    >
      <DocsP>
        Whats the difference between the TopAppBar and Toolbar? Toolbar is
        technically deprecated (although it still works just fine). TopAppBar
        functionality continues to be worked on by the `material-components-web`
        team.
      </DocsP>

      <DocsSubtitle>Basic Usage</DocsSubtitle>

      <DocsExample label="Default" iframe>
        <>
          <TopAppBar>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarTitle>Default</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsExample label="Fully Featured" iframe>
        <>
          <TopAppBar>
            <TopAppBarRow>
              <TopAppBarSection alignStart>
                <TopAppBarNavigationIcon icon="menu" />
                <TopAppBarTitle>All Features</TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection alignEnd>
                <TopAppBarActionItem icon="favorite" />
                <TopAppBarActionItem icon="star" />
                <TopAppBarActionItem icon="mood" />
              </TopAppBarSection>
            </TopAppBarRow>
            <TopAppBarRow>
              <TopAppBarSection alignStart>
                <TopAppBarTitle>Another Row</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsSubtitle>Simplified Usage</DocsSubtitle>
      <DocsP>
        You can use the `SimpleTopAppBar` component which contains a default
        template already laid out for you. Specify any actions you want as an
        array of props
      </DocsP>
      <DocsExample label="Simple" iframe>
        <>
          <SimpleTopAppBar
            title="test"
            navigationIcon
            onNav={() => console.log('Navigate')}
            actionItems={[
              {
                icon: 'file_download',
                onClick: () => console.log('Do Something')
              },
              { icon: 'print', onClick: () => console.log('Do Something') },
              { icon: 'bookmark', onClick: () => console.log('Do Something') }
            ]}
          />
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>

      <DocsExample label="Fixed" iframe>
        <>
          <TopAppBar fixed>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarTitle>Fixed</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsExample label="Dense" iframe>
        <>
          <TopAppBar dense>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarTitle>Dense</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsExample label="Short" iframe>
        <>
          {/** Additionally you can specify shortCollapsed to have it always minimized */}
          <TopAppBar short>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarNavigationIcon icon="menu" />
                <TopAppBarTitle>Short</TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection alignEnd>
                <TopAppBarActionItem icon="favorite" />
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsExample label="Prominent" iframe>
        <>
          <TopAppBar prominent>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarTitle>Prominent</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'TopAppBar', component: TopAppBar },
          { displayName: 'TopAppBarRow', component: TopAppBarRow },
          { displayName: 'TopAppBarSection', component: TopAppBarSection },
          { displayName: 'TopAppBarTitle', component: TopAppBarTitle },
          {
            displayName: 'TopAppBarNavigationIcon',
            component: TopAppBarNavigationIcon
          },
          {
            displayName: 'TopAppBarActionItem',
            component: TopAppBarActionItem
          },
          {
            displayName: 'TopAppBarFixedAdjust',
            component: TopAppBarFixedAdjust
          },
          { displayName: 'SimpleTopAppBar', component: SimpleTopAppBar }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <SimpleTopAppBar
      style={{ position: 'static', top: 0, transform: 'scale(0.9)' }}
      title="App Bar"
      navigationIcon={{ onClick: () => console.log('Navigate') }}
      actionItems={[
        {
          icon: 'file_download',
          onClick: () => console.log('Do Something')
        },
        {
          icon: 'print',
          onClick: () => console.log('Do Something')
        }
      ]}
    />
  </>
);
