# Text Fields

Text fields allow users to input, edit, and select text.

- Module **@rmwc/textfield**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/textfield/styles';
  - Or include stylesheets
    - **'@material/textfield/dist/mdc.textfield.css'**
    - **'@material/floating-label/dist/mdc.floating-label.css'**
    - **'@material/notched-outline/dist/mdc.notched-outline.css'**
    - **'@material/line-ripple/dist/mdc.line-ripple.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/text-field/](https://material.io/develop/web/components/input-controls/text-field/)

## TextField Variants

```jsx
<TextField label="standard..." />
```

```jsx
<TextField outlined label="outlined..." />
```

```jsx
<TextField fullwidth placeholder="fullWidth..." />
```

```jsx
<TextField placeholder="No label" />
```

```jsx
<>
  {/* Leading and trailing icons can be used.*/}
  <TextField icon="search" trailingIcon="close" label="icon..." />
  {/* If you need full control over the icon, you can pass the icon as options with your own props. Dont forget the TabIndex to make it clickable*/}
  <TextField
    label="trailingIcon..."
    trailingIcon={{
      icon: 'close',
      tabIndex: 0,
      onClick: () => console.log('Clear')
    }}
  />
</>
```

## Textareas

You can make the TextField a textarea. Make sure to include `outlined` for proper styling You can optionally make help text always visible by passing an object as props with persistent set to true. Textareas can also have an optional character counter which will work with the maxLength property.

```jsx
<TextField
  textarea
  outlined
  fullwidth
  label="textarea..."
  rows={8}
  maxLength={20}
  characterCount
  helpText={{
    persistent: true,
    validationMsg: true,
    children: 'The field is required'
  }}
/>
```

## Validation

```jsx
<TextField disabled label="Disabled..." />
```

```jsx
<TextField required label="Required..." value="" />
```

```jsx
<TextField
  invalid
  label="Invalid..."
  value="#@!$"
  onChange={() => {}}
/>
```

```jsx
<TextField label="Validate Pattern" pattern="[A-Za-z]{3}" />
```

## HTML Input Types

A preview of how `material-components-web` handles styling input types for your browser.

```jsx
<>
  <TextField label="text" type="text" />
  <TextField label="color" type="color" style={{ width: '6rem' }} />
  <TextField label="date" type="date" />
  <TextField label="datetime-local" type="datetime-local" />
  <TextField label="month" type="month" />
  <TextField label="range" type="range" />
  <TextField label="time" type="time" />
  <TextField label="week" type="week" />
</>
```

## TextField
A TextField component for accepting text input from a user.

### Props

| Name | Type | Description |
|------|------|-------------|
| `align` | `"start" \| "end"` | How to align the text inside the TextField. Defaults to 'start'. |
| `characterCount` | `undefined \| false \| true` | Shows the character count, must be used in conjunction with maxLength. |
| `disabled` | `undefined \| false \| true` | Makes the Textfield disabled. |
| `floatLabel` | `undefined \| false \| true` | The label floats automatically based on value, but you can use this prop for manual control. |
| `foundationRef` | `React.Ref<MDCTextFieldFoundation \| null>` | Advanced: A reference to the MDCFoundation. |
| `fullwidth` | `undefined \| false \| true` | Makes the TextField fullwidth. |
| `helpText` | `React.ReactNode \| TextFieldHelperTextProps` | Adds help text to the field |
| `icon` | `RMWC.IconPropT` | Add a leading icon. |
| `inputRef` | `React.Ref<HTMLInputElement \| HTMLTextAreaElement \| null>` | A reference to the native input or textarea. |
| `invalid` | `undefined \| false \| true` | Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used. |
| `label` | `React.ReactNode` | A label for the input. |
| `outlined` | `undefined \| false \| true` | Outline the TextField. |
| `required` | `undefined \| false \| true` | Makes the Textfield required. |
| `rootProps` | `Object` | By default, props spread to the input. These props are for the component's root container. |
| `textarea` | `undefined \| false \| true` | Makes a multiline TextField. |
| `trailingIcon` | `RMWC.IconPropT` | Add a trailing icon. |
| `type` | `undefined \| string` | The type of input field to render, search, number, etc |
| `value` | `string \| number` | Sets the value for controlled TextFields. |


