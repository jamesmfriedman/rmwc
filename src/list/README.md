# Lists

Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/list/styles';
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Basic Usage

```jsx
<List>
  <ListItem>Cookies</ListItem>
  <ListItem>Pizza</ListItem>
  <ListItem>Icecream</ListItem>
</List>
```

```jsx
<List twoLine>
  <ListItem>
    <ListItemGraphic icon="star_border" />
    <ListItemText>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="local_pizza" />
    <ListItemText>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem activated>
    <ListItemGraphic icon="mood" />
    <ListItemText>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta>Winner!</ListItemMeta>
  </ListItem>
</List>
```

## Simplified Usage

While there are siutations where you would need / want to compose the entire list yourself, it can be quite verbose. `SimpleListItem` provides a compact syntax that allows you to pass all options as props. The following example is roughly equivalent to the one above.

```jsx
<List twoLine>
  <SimpleListItem
    graphic="star_border"
    text="Cookies"
    secondaryText="Chocolate chip"
    metaIcon="info"
  />
  <SimpleListItem
    graphic="local_pizza"
    text="Pizza"
    secondaryText="Pepperoni"
    metaIcon="info"
  />
  <SimpleListItem
    activated
    graphic="mood"
    text="Icecream"
    secondaryText="Chocolate cookie dough"
    meta="Winner!"
  />
</List>
```

## List
A List Component

### Props

| Name | Type | Description |
|------|------|-------------|
| `apiRef` | `undefined \| (api: ListApi \| null) => void` | An internal api used for cross component communication |
| `avatarList` | `undefined \| false \| true` | Makes the list start detail circular for avatars. |
| `dense` | `undefined \| false \| true` | Reduces the padding on List items. |
| `foundationRef` | `React.Ref<MDCListFoundation \| null>` | Advanced: A reference to the MDCFoundation. |
| `nonInteractive` | `undefined \| false \| true` | Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. |
| `onAction` | `undefined \| (evt: ListOnActionEventT) => void` | A callback for when a list item is interacted with. evt.detail = number |
| `twoLine` | `undefined \| false \| true` | Gives more space for dual lined list items. |
| `vertical` | `undefined \| false \| true` | Sets the lists vertical orientation. Defaults to true |
| `wrapFocus` | `undefined \| false \| true` | Sets the list to allow the up arrow on the first element to focus the
last element of the list and vice versa. Defaults to true |


## ListItem
A ListItem component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined \| false \| true` | A modifier for an active state. |
| `disabled` | `undefined \| false \| true` | A modifier for a disabled state. |
| `selected` | `undefined \| false \| true` | A modifier for a selected state. |


## ListItemPrimaryText
Primary Text for the ListItem



## ListItemSecondaryText
Secondary text for the ListItem



## ListItemGraphic
A graphic / icon for the ListItem



## ListItemMeta
Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content.



## ListDivider
A divider for the List



## ListGroup
A container to group ListItems



## ListGroupSubheader
A subheader for the ListGroup



## SimpleListItem
A simple list item template.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined \| false \| true` | A modifier for an active state. |
| `children` | `React.ReactNode` | Children to render |
| `disabled` | `undefined \| false \| true` | A modifier for a disabled state. |
| `graphic` | `RMWC.IconPropT` | A graphic icon for the ListItem. |
| `meta` | `React.ReactNode` | Meta content for the ListItem instead of an icon. |
| `metaIcon` | `RMWC.IconPropT` | A meta icon for the ListItem |
| `secondaryText` | `React.ReactNode` | Secondary Text for the ListItem. |
| `selected` | `undefined \| false \| true` | A modifier for a selected state. |
| `text` | `React.ReactNode` | Text for the ListItem. |


