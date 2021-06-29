import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Menu,
  MenuItem,
  MenuSurface,
  MenuSurfaceAnchor,
  SimpleMenu,
  SimpleMenuSurface
} from '.';

import { ListDivider } from '../list';
import { Button } from '../button';
import { Select } from '../select';
import { IconButton } from '../icon-button';
import { Checkbox } from '../checkbox';

export default function Readme() {
  return (
    <Docs
      title="Menus"
      lead="Menus display a list of choices on a transient sheet of material."
      module="@rmwc/menu"
      styles={[
        '@material/menu/dist/mdc.menu.css',
        '@material/menu-surface/dist/mdc.menu-surface.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@material/list/dist/mdc.list.css',
        '@rmwc/icon/icon.css'
      ]}
      docsLink="https://material.io/develop/web/components/menus/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        You can compose a menu with the given components, and manually manage
        the open state. `Menu` expects MenuItems as children while `MenuSurface`
        is a generic container which can have anything as a child.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <MenuSurfaceAnchor>
              <Menu
                open={open}
                onSelect={(evt) => console.log(evt.detail.index)}
                onClose={(evt) => setOpen(false)}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                {/** MenuItem is just a ListItem, so you can intermingle other List components */}
                <ListDivider />
                <MenuItem>Icecream</MenuItem>
              </Menu>

              <Button raised onClick={(evt) => setOpen(!open)}>
                Menu
              </Button>
            </MenuSurfaceAnchor>
          );
        }}
      </DocsExample>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <MenuSurfaceAnchor>
              <MenuSurface open={open} onClose={(evt) => setOpen(false)}>
                <div style={{ padding: '1rem', width: '8rem' }}>
                  Make the content whatever you want.
                </div>
              </MenuSurface>

              <Button raised onClick={(evt) => setOpen(!open)}>
                Menu Surface
              </Button>
            </MenuSurfaceAnchor>
          );
        }}
      </DocsExample>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <MenuSurfaceAnchor>
              <MenuSurface open={open} onClose={(evt) => setOpen(false)}>
                <div style={{ padding: '1rem', width: '8rem' }}>Menu</div>
              </MenuSurface>
              {/** The handle can be any component you want */}
              <IconButton icon="menu" onClick={(evt) => setOpen(!open)} />
            </MenuSurfaceAnchor>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Simplified usage</DocsSubtitle>
      <DocsP>
        RMWC provides a convenience `SimpleMenu` component that takes a handle
        as a prop, and manages the open state for you.
      </DocsP>

      <DocsExample>
        <SimpleMenu handle={<Button>Simple Menu</Button>}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </SimpleMenu>
      </DocsExample>

      <DocsExample>
        <SimpleMenuSurface handle={<Button>Simple Menu Surface</Button>}>
          <div style={{ padding: '1rem', width: '8rem' }}>
            Make the content whatever you want.
          </div>
        </SimpleMenuSurface>
      </DocsExample>

      <DocsSubtitle>Anchoring</DocsSubtitle>
      <DocsP>
        By default, Menus will attempt to automatically position themselves, but
        this behavior can be overridden by setting the `anchorCorner` prop.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [anchorCorner, setAnchorCorner] =
            React.useState<any>('topLeft');

          return (
            <>
              <MenuSurfaceAnchor>
                <MenuSurface anchorCorner={anchorCorner} open={true}>
                  <div style={{ padding: '1rem', width: '8rem' }}>
                    anchorCorner: {anchorCorner}
                  </div>
                </MenuSurface>
                <Button raised label="Anchored Menu" />
              </MenuSurfaceAnchor>

              <Select
                value={anchorCorner}
                label="anchorCorner"
                onChange={(evt) => setAnchorCorner(evt.currentTarget.value)}
                options={[
                  'topLeft',
                  'topRight',
                  'bottomLeft',
                  'bottomRight',
                  'topStart',
                  'topEnd',
                  'bottomStart',
                  'bottomEnd'
                ]}
              />
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Rendering through Portals</DocsSubtitle>
      <DocsP>
        Occasionally, you may find your menu being cut off from being inside a
        container that is styled to be `overflow:hidden`. RMWC provides a
        `renderToPortal` prop that lets you use React's portal functionality to
        render the menu dropdown in a different container.
      </DocsP>

      <DocsP>
        You can specify any element or selector you want, but the simplest
        method is to pass `true` and use RMWC's built in `Portal` component.
      </DocsP>

      <DocsExample codeOnly>
        {
          /* jsx */ `
          // Somewhere at the top level of your app
          // Render the RMWC Portal
          // You only have to do this once
          import React from 'react';
          import { Portal } from '@rmwc/base';

          export default function App() {
            return (
              <div>
                ...
                <Portal />
              </div>
            )
          }
        `
        }
      </DocsExample>

      <DocsP>
        Now you can use the `renderToPortal` prop. Below is a contrived example
        of a menu being cut off due to `overflow: hidden`.
      </DocsP>

      <DocsExample>
        {function Example() {
          const [renderToPortal, setRenderToPortal] = React.useState(true);
          const options = ['Cookies', 'Pizza', 'Icecream'];
          return (
            <>
              <div
                style={{
                  marginBottom: '10rem',
                  height: '3.5rem',
                  overflow: 'hidden'
                }}
              >
                <MenuSurfaceAnchor>
                  <Button raised>Open Menu</Button>
                  <Menu open renderToPortal={renderToPortal}>
                    {options.map((o) => (
                      <MenuItem key={o}>{o}</MenuItem>
                    ))}
                  </Menu>
                </MenuSurfaceAnchor>
              </div>
              <Checkbox
                checked={renderToPortal}
                onChange={(evt) => setRenderToPortal(evt.currentTarget.checked)}
                label="renderToPortal"
              />
            </>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Menu', component: Menu },
          { displayName: 'MenuItem', component: MenuItem },
          { displayName: 'MenuSurface', component: MenuSurface },
          { displayName: 'MenuSurfaceAnchor', component: MenuSurfaceAnchor },
          { displayName: 'SimpleMenu', component: SimpleMenu },
          { displayName: 'SimpleMenuSurface', component: SimpleMenuSurface }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <div
    aria-hidden="false"
    className="mdc-menu  mdc-menu-surface--open mdc-menu-surface"
    style={{ position: 'static' }}
  >
    <div role="menu" className="mdc-list mdc-menu__items mdc-list">
      <div role="menuitem" className="mdc-ripple-upgraded mdc-list-item">
        Cookies
      </div>
      <div role="menuitem" className="mdc-ripple-upgraded mdc-list-item">
        Pizza
      </div>
      <div role="menuitem" className="mdc-ripple-upgraded mdc-list-item">
        Icecream
      </div>
    </div>
  </div>
);
