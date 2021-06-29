import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerAppContent
} from '.';

import { List, ListItem } from '../list';

import { Button } from '../button';

export default function Readme() {
  return (
    <Docs
      title="Drawers"
      lead="A navigation drawer slides in from the left and contains the navigation destinations for your app."
      module="@rmwc/drawer"
      styles={['@material/drawer/dist/mdc.drawer.css']}
      docsLink="https://material.io/develop/web/components/drawers/"
      examples={examples}
    >
      <DocsSubtitle>Permanent</DocsSubtitle>
      <DocsP>
        These are drawers that are permanently fixed inside of a view.
      </DocsP>

      <DocsExample>
        <Drawer>
          <DrawerHeader>
            <DrawerTitle>DrawerHeader</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>Cookies</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Icecream</ListItem>
            </List>
          </DrawerContent>
        </Drawer>
      </DocsExample>

      <DocsSubtitle>Dismissible</DocsSubtitle>
      <DocsP>
        These are drawers that can be toggled to an open or closed state inside
        of a view, but still takes up viewable space when closed.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <Drawer dismissible open={open}>
                  <DrawerHeader>
                    <DrawerTitle>DrawerHeader</DrawerTitle>
                    <DrawerSubtitle>Subtitle</DrawerSubtitle>
                  </DrawerHeader>
                  <DrawerContent>
                    <List>
                      <ListItem>Cookies</ListItem>
                      <ListItem>Pizza</ListItem>
                      <ListItem>Icecream</ListItem>
                    </List>
                  </DrawerContent>
                </Drawer>

                {/* Optional DrawerAppContent */}
                <DrawerAppContent
                  style={{ minHeight: '15rem', padding: '1rem' }}
                >
                  DrawerAppContent is an optional component that will resize
                  content when the dismissible drawer is open and closed. It
                  must be placed directly after the Drawer component.
                </DrawerAppContent>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Button onClick={() => setOpen(!open)} raised>
                  Toggle Dismissible
                </Button>
              </div>
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Modal</DocsSubtitle>
      <DocsP>
        These are drawers that can be temporarily displayed fixed on the side of
        the entire viewport.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <Drawer modal open={open} onClose={() => setOpen(false)}>
                <DrawerHeader>
                  <DrawerTitle>DrawerHeader</DrawerTitle>
                  <DrawerSubtitle>Subtitle</DrawerSubtitle>
                </DrawerHeader>
                <DrawerContent>
                  <List>
                    <ListItem>Cookies</ListItem>
                    <ListItem>Pizza</ListItem>
                    <ListItem>Icecream</ListItem>
                  </List>
                </DrawerContent>
              </Drawer>

              <Button onClick={() => setOpen(!open)} raised>
                Toggle Modal
              </Button>
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Right Side Drawers</DocsSubtitle>
      <DocsP>
        `material-components-web` doesn't directly support right hand drawers,
        but it respects the `dir` attribute on DOM elements. This simple hack
        will allow you to get drawers that appear from the right hand side of
        your app. As an aside, the `dir` attribute can be used to invert many
        other behaviors where the element is anchored on the left.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              {/** Make the drawer appear right-to-left */}
              <Drawer
                dir="rtl"
                modal
                open={open}
                onClose={() => setOpen(false)}
              >
                {/** Set the content back to left-to-right */}
                <DrawerHeader dir="ltr">
                  <DrawerTitle>Right Drawer</DrawerTitle>
                  <DrawerSubtitle>Subtitle</DrawerSubtitle>
                </DrawerHeader>

                <DrawerContent dir="ltr">
                  <List>
                    <ListItem>Cookies</ListItem>
                    <ListItem>Pizza</ListItem>
                    <ListItem>Icecream</ListItem>
                  </List>
                </DrawerContent>
              </Drawer>

              <Button onClick={() => setOpen(!open)} raised>
                Toggle Right Drawer
              </Button>
            </>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Drawer', component: Drawer },
          { displayName: 'DrawerHeader', component: DrawerHeader },
          { displayName: 'DrawerTitle', component: DrawerTitle },
          { displayName: 'DrawerSubtitle', component: DrawerSubtitle },
          { displayName: 'DrawerContent', component: DrawerContent },
          { displayName: 'DrawerAppContent', component: DrawerAppContent }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Drawer
    style={{ transform: 'scale(0.75', boxShadow: '0 0 4px rgba(0,0,0,0.1)' }}
  >
    <DrawerHeader>
      <DrawerTitle>DrawerHeader</DrawerTitle>
      <DrawerSubtitle>Subtitle</DrawerSubtitle>
    </DrawerHeader>
    <DrawerContent>
      <List>
        <ListItem>Cookies</ListItem>
        <ListItem>Pizza</ListItem>
        <ListItem>Icecream</ListItem>
      </List>
    </DrawerContent>
  </Drawer>
);
