# Menus

Menus display a list of choices on a transient sheet of material.

- Module **@rmwc/menu**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/menu/styles';
  - Or include stylesheets
    - **'@material/menu/dist/mdc.menu.css'**
    - **'@material/menu-surface/dist/mdc.menu-surface.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@material/list/dist/mdc.list.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/menus/](https://material.io/develop/web/components/menus/)

## Basic Usage

You can compose a menu with the given components, and manually manage the open state. `Menu` expects MenuItems as children while `MenuSurface` is a generic container which can have anything as a child.

```jsx
function Example() {
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
}
```

```jsx
function Example() {
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
}
```

```jsx
function Example() {
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
}
```

## Simplified usage

RMWC provides a convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```jsx
<SimpleMenu handle={<Button>Simple Menu</Button>}>
  <MenuItem>Cookies</MenuItem>
  <MenuItem>Pizza</MenuItem>
  <MenuItem>Icecream</MenuItem>
</SimpleMenu>
```

```jsx
<SimpleMenuSurface handle={<Button>Simple Menu Surface</Button>}>
  <div style={{ padding: '1rem', width: '8rem' }}>
    Make the content whatever you want.
  </div>
</SimpleMenuSurface>
```

## Anchoring

By default, Menus will attempt to automatically position themselves, but this behavior can be overridden by setting the `anchorCorner` prop.

```jsx
function Example() {
  const [anchorCorner, setAnchorCorner] =
    React.useState('topLeft');

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
}
```

## Rendering through Portals

Occasionally, you may find your menu being cut off from being inside a container that is styled to be `overflow:hidden`. RMWC provides a `renderToPortal` prop that lets you use React's portal functionality to render the menu dropdown in a different container.

You can specify any element or selector you want, but the simplest method is to pass `true` and use RMWC's built in `Portal` component.

```jsx

  `
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

```

Now you can use the `renderToPortal` prop. Below is a contrived example of a menu being cut off due to `overflow: hidden`.

```jsx
function Example() {
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
}
```

## Menu
A menu component for displaying lists items.

### Props

| Name | Type | Description |
|------|------|-------------|
| `apiRef` | `undefined \| (api: MenuApi \| null) => void` | Internal api reference for cross component communication. |
| `focusOnOpen` | `undefined \| false \| true` | Whether or not to focus the first list item on open. Defaults to true. |
| `foundationRef` | `React.Ref<MDCMenuFoundation>` | Advanced: A reference to the MDCFoundation. |
| `onSelect` | `undefined \| (evt: MenuOnSelectEventT) => void` | Callback that fires when a Menu item is selected. evt.detail = { index: number; item: HTMLElement; } |


## MenuItem
This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility.



## MenuSurface
### Props

| Name | Type | Description |
|------|------|-------------|
| `anchorCorner` | `AnchorT` | Manually position the menu to one of the corners. |
| `apiRef` | `undefined \| (api: MenuSurfaceApi \| null) => void` | An internal api for cross component communication. |
| `children` | `React.ReactNode` | Children to render. |
| `fixed` | `undefined \| false \| true` | Make the menu position fixed. |
| `foundationRef` | `React.Ref<MDCMenuSurfaceFoundation>` | Advanced: A reference to the MDCFoundation. |
| `onClose` | `undefined \| (evt: MenuSurfaceOnCloseEventT) => void` | Callback for when the menu is closed. |
| `onOpen` | `undefined \| (evt: MenuSurfaceOnOpenEventT) => void` | Callback for when the menu is opened. |
| `open` | `undefined \| false \| true` | Opens the menu. |
| `renderToPortal` | `PortalPropT` | Renders the menu to a portal. Useful for situations where the content might be cutoff by an overflow: hidden container. You can pass "true" to render to the default RMWC portal. |


## MenuSurfaceAnchor
MenuSurfaceAnchor



## SimpleMenu
A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor

### Props

| Name | Type | Description |
|------|------|-------------|
| `apiRef` | `undefined \| (api: MenuApi \| null) => void` | Internal api reference for cross component communication. |
| `children` | `React.ReactNode` | Children to render |
| `focusOnOpen` | `undefined \| false \| true` | Whether or not to focus the first list item on open. Defaults to true. |
| `foundationRef` | `React.Ref<MDCMenuFoundation>` | Advanced: A reference to the MDCFoundation. |
| `handle` | `ReactElement<any>` | An element that will open the menu when clicked |
| `onSelect` | `undefined \| (evt: MenuOnSelectEventT) => void` | Callback that fires when a Menu item is selected. evt.detail = { index: number; item: HTMLElement; } |
| `rootProps` | `Object` | By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor. |


## SimpleMenuSurface
The same as SimpleMenu, but a generic surface.

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Children to render |
| `handle` | `ReactElement<any>` | An element that will open the menu when clicked |
| `rootProps` | `Object` | By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor. |


