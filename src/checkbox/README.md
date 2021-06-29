# Checkboxes

Checkboxes allow the user to select multiple options from a set.

- Module **@rmwc/checkbox**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/checkbox/styles';
  - Or include stylesheets
    - **'@material/checkbox/dist/mdc.checkbox.css'**
    - **'@material/form-field/dist/mdc.form-field.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/checkboxes/](https://material.io/develop/web/components/input-controls/checkboxes/)

```jsx
function Example() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      label="Cookies"
      checked={checked}
      onChange={(evt) => setChecked(!!evt.currentTarget.checked)}
    />
  );
}
```

```jsx
<Checkbox label="Pizza" />
```

```jsx
<Checkbox>Icecream</Checkbox>
```

```jsx
<>
  <Checkbox label="Broccoli" indeterminate />

  <Checkbox label="Always On" checked />
  <Checkbox label="Always Off" checked={false} />
</>
```

## Checkbox
A Checkbox component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `indeterminate` | `undefined \| false \| true` | Make the control indeterminate |


