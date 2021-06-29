# Avatars `RMWC ADDON`

Avatars are virtual representations of users in a system.

- Module **@rmwc/avatar**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/avatar/styles';
  - Or include stylesheets
    - **'@rmwc/avatar/avatar.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**


```jsx
<>
  <Avatar
    src="images/avatars/blackwidow.png"
    size="xsmall"
    name="Natalia Alianovna Romanova"
  />
  <Avatar
    src="images/avatars/hulk.png"
    size="small"
    name="Bruce Banner"
  />
  <Avatar
    src="images/avatars/thor.png"
    size="medium"
    name="Thor Odinson"
  />
  <Avatar
    src="images/avatars/captainamerica.png"
    size="large"
    name="Steve Rogers"
  />
  <Avatar
    src="images/avatars/ironman.png"
    size="xlarge"
    name="Tony Stark"
  />
</>
```

```jsx
<>
  <Avatar name="Natalia Alianovna Romanova" size="xsmall" />
  <Avatar name="Bruce Banner" size="small" />
  <Avatar name="Thor Odinson" size="medium" />
  <Avatar name="Steve Rogers" size="large" />
  <Avatar name="Tony Stark" size="xlarge" />
</>
```

```jsx
<Avatar
  src="images/avatars/blackwidow.png"
  size="large"
  name="Natalia Alianovna Romanova"
  square
/>
```

```jsx
<Avatar
  src="images/avatars/google.svg"
  size="large"
  contain
  name="Google"
  square
/>
```

## Avatar Groups

This is for Avatars that are displayed in a corellated grouping or list.

```jsx
<AvatarGroup>
  <Avatar
    src="images/avatars/captainamerica.png"
    name="Steve Rogers"
    size="large"
    interactive
  />
  <Avatar
    src="images/avatars/ironman.png"
    name="Tony Stark"
    size="large"
    interactive
  />
  <AvatarCount size="large" value={12} interactive />
</AvatarGroup>
```

```jsx
<AvatarGroup dense>
  <Avatar
    src="images/avatars/captainamerica.png"
    name="Steve Rogers"
    size="large"
    interactive
  />
  <Avatar
    src="images/avatars/ironman.png"
    name="Tony Stark"
    size="large"
    interactive
  />
  <AvatarCount size="large" overflow value={4} interactive />
</AvatarGroup>
```

## Usage with other components

The avatar component has been designed to work nicely in any of the places you would use an icon.

```jsx
<Button
  label="Enlist now!"
  icon={
    <Avatar
      src="images/avatars/captainamerica.png"
      name="Steve Rogers"
    />
  }
/>
```

```jsx
<Chip
  label="Hulk Smash"
  icon={<Avatar src="images/avatars/hulk.png" name="Bruce Banner" />}
/>
```

```jsx
<TextField
  label="Message Natalia..."
  outlined
  icon={
    <Avatar
      src="images/avatars/blackwidow.png"
      name="Natalia Alianovna Romanova"
      square
    />
  }
/>
```

## Avatar
An Avatar component for displaying users in a system.

### Props

| Name | Type | Description |
|------|------|-------------|
| `contain` | `undefined \| false \| true` | Contain the avatar image instead of covering. |
| `interactive` | `undefined \| false \| true` | Make the avatar interactive. |
| `name` | `undefined \| string` | The name of the user. This will get converted to initials and set the hover title. |
| `size` | `RMWC.IconSizeT` | The size of the avatar |
| `square` | `undefined \| false \| true` | Make the avatar square. |
| `src` | `undefined \| string` | The url for the image. This gets passed to the Icon component. |


## AvatarGroup
A container for groups of Avatars

### Props

| Name | Type | Description |
|------|------|-------------|
| `dense` | `undefined \| false \| true` | Makes the list dense |


## AvatarCount
An Avatar count for displaying list overflow.

### Props

| Name | Type | Description |
|------|------|-------------|
| `interactive` | `undefined \| false \| true` | Make the avatar interactive. |
| `overflow` | `undefined \| false \| true` | Optionally renders a "+" to indicate overlow. |
| `size` | `RMWC.IconSizeT` | The size of the avatar |
| `square` | `undefined \| false \| true` | Make the avatar square. |
| `value` | `number` | The number of users. |


