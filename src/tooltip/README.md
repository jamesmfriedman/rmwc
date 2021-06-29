# Tooltips `RMWC ADDON`

Tooltips display informative text when users hover over, focus on, or tap an element.

- Module **@rmwc/tooltip**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/tooltip/styles';
  - Or include stylesheets
    - **'@rmwc/tooltip/tooltip.css'**


## Basic Usage

Wrap any component in a `Tooltip` and provide the content attribute. The only requirement is that is has a single React child, and that the child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick` props.

```jsx
<>
  <Tooltip content="Cookies">
    <IconButton icon="star_border" />
  </Tooltip>

  <Tooltip content="Pizza">
    <IconButton icon="favorite_border" />
  </Tooltip>

  <Tooltip content="Icecream">
    <IconButton icon="mood" />
  </Tooltip>
</>
```

## Variants

```jsx
<Tooltip content="Cake" showArrow>
  <IconButton icon="cake" />
</Tooltip>
```

```jsx
<Tooltip content="Hello" align="right" open={true}>
  <IconButton icon="mood" />
</Tooltip>
```

```jsx
<Tooltip
  content={
    <div style={{ display: 'flex' }}>
      <Avatar
        src="images/avatars/captainamerica.png"
        size="large"
        name="Steve Rogers"
      />
      <div style={{ marginLeft: '0.5rem' }}>
        <b>Captain America</b>
        <div>Steve Rogers</div>
      </div>
    </div>
  }
>
  <span role="button">S. Rogers</span>
</Tooltip>
```

```jsx
<Tooltip
  /** You make something like a popover window by just styling your inner content. */
  content={
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        width: '20rem',
        height: '8rem',
        color: 'black',
        borderRadius: '3px',
        margin: '0 -3px'
      }}
    >
      Hello World!
    </div>
  }
>
  <span role="button">Popover Window</span>
</Tooltip>
```

```jsx
<>
  <Tooltip content="Cookies" enterDelay={1000}>
    <Button label="Enter Delay" />
  </Tooltip>

  <Tooltip content="Pizza" leaveDelay={1000}>
    <Button label="Leave Delay" />
  </Tooltip>

  <Tooltip content="Icecream" enterDelay={1000} leaveDelay={1000}>
    <Button label="Both" />
  </Tooltip>
</>
```

```jsx
function AlignmentExample() {
  return [
    'left',
    'right',
    'top',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight'
  ].map((align) => (
    <Tooltip key={align} content={`Align: ${align}`} align={align}>
      <IconButton icon="trip_origin" />
    </Tooltip>
  ));
}
```

## Activation

By default, tooltips will activate on hover and focus. You can change this behavior by passing one or more options to the `activateOn` prop.

```jsx
<>
  <Tooltip content="Cookies" activateOn="hover">
    <Button label="Hover" />
  </Tooltip>
  ''
  <Tooltip content="Pizza" activateOn="click">
    <Button label="Click" />
  </Tooltip>
  <Tooltip content="Icecream" activateOn="focus">
    <Button label="Focus" />
  </Tooltip>
  <Tooltip content="Cake" activateOn={['hover', 'focus']}>
    <Button label="Multiple" />
  </Tooltip>
</>
```

## Usage with RMWCProvider

The RMWCProvider allows you to specify global defaults for your tooltips.

```jsx
<RMWCProvider
  tooltip={{
    align: 'right',
    activateOn: 'hover',
    showArrow: true,
    leaveDelay: 500,
    enterDelay: 0
  }}
>
  <Tooltip content="Hello World!">
    <Button label="With Provider" />
  </Tooltip>
</RMWCProvider>
```

## Tooltip
A Tooltip component for displaying informative popover information.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activateOn` | `TooltipActivationT \| TooltipActivationT[]` | Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. |
| `align` | `TooltipAlignT` | How to align the tooltip. Defaults to `top`. |
| `children` | `React.ReactChild` | The children that the tooltip belongs to. Must be a single React.child. |
| `className` | `undefined \| string` | Custom className to add to the tooltip overlay container. |
| `content` | `React.ReactNode` | The overlay content for the tooltip. |
| `enterDelay` | `undefined \| number` | Delay in milliseconds before showing the tooltip when interacting via touch or mouse. |
| `leaveDelay` | `undefined \| number` | Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. |
| `open` | `undefined \| false \| true` | Manually control the open state |
| `showArrow` | `undefined \| false \| true` | Whether or not to show an arrow on the Tooltip. Defaults to `false`. |


