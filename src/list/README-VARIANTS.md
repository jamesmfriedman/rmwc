# Lists

Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/list/styles';
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Two Line

When using the `twoLine` prop, you have to wrap the contents of the `ListItem` in `ListItemText`.

```jsx
<List twoLine>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
</List>
```

## Leading and Trailing Icons

```jsx
<List>
  <ListItem>
    <ListItemGraphic icon="favorite" />
    Leading
  </ListItem>
  <ListItem>
    Trailing
    <ListItemMeta icon="star" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi" />
    Leading and Trailing
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi" />
    Leading with Trailing Text
    <ListItemMeta>HELLO!</ListItemMeta>
  </ListItem>
</List>
```

## Avatar List with Dividers

```jsx
<List twoLine avatarList>
  <ListGroup>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/blackwidow.png"
            size="xsmall"
            name="Natalia Alianovna Romanova"
          />
        }
      />
      Natalia Alianovna Romanova
      <ListItemMeta icon="info" />
    </ListItem>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/hulk.png"
            size="small"
            name="Bruce Banner"
          />
        }
      />
      Bruce Banner
      <ListItemMeta icon="info" />
    </ListItem>
  </ListGroup>
  <ListDivider />
  <ListGroup>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/thor.png"
            size="medium"
            name="Thor Odinson"
          />
        }
      />
      Thor Odinson
      <ListItemMeta icon="info" />
    </ListItem>
  </ListGroup>
</List>
```

## Selectable

Checkboxes and Radios can be included as part of `ListItemMeta`. It is recommended when using these that you are using controlled components, and that you put your interaction handler on the `ListItem` itself. Notice the `readOnly` prop is also set on the individual form elements.

```jsx
function Example() {
  const [checked, setChecked] = React.useState({
    Cookies: false,
    Pizza: false,
    Icecream: false
  });

  return (
    <List>
      {['Cookies', 'Pizza', 'Icecream'].map((key) => (
        <ListItem
          key={key}
          onClick={() =>
            setChecked({ ...checked, [key]: !checked[key] })
          }
        >
          {key}
          <ListItemMeta>
            <Checkbox checked={checked[key]} readOnly />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
```

```jsx
function Example() {
  const [checked, setChecked] = React.useState({
    Cookies: false,
    Pizza: false,
    Icecream: false
  });

  return (
    <List>
      {['Cookies', 'Pizza', 'Icecream'].map((key) => (
        <ListItem
          key={key}
          onClick={() =>
            setChecked({ ...checked, [key]: !checked[key] })
          }
        >
          {key}
          <ListItemMeta>
            <Switch checked={checked[key]} readOnly />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
```

```jsx
function Example() {
  const [checked, setChecked] = React.useState('Cookies');

  return (
    <List>
      {['Cookies', 'Pizza', 'Icecream'].map((key) => (
        <ListItem key={key} onClick={() => setChecked(key)}>
          {key}
          <ListItemMeta>
            <Radio checked={checked === key} readOnly />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
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


