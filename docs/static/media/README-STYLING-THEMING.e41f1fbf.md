# Styling and Theming

> Material Components Web uses standard CSS and the BEM syntax to style components. RMWC has some additional style sheets for custom components that mirror this behavior and use standard CSS. You do have to include the stylesheets for each component, but for customizing them you are free to use whatever method of styling you like (CSS Modules, styled components, JSS, etc).

- [Including Stylesheets](#including-stylesheets)
- [Standard CSS](#using-standard-css)
- [CSS Modules](#using-css-modules)
- [Styled Components](#using-the-styled-components-library)
- [Runtime Color Theming](#theming-with-runtime-css-variables.)
- [Dark Mode Support](#dark-mode)
- [SASS Customization](#sass-customization)
- [Theme and ThemeProvider](#theme-and-themeprovider)

## Including Stylesheets

Before you can customize the components, you need to include the base stylesheets from Material Components Web and RMWC. The imports are listed at the top of each components docs page and you can include them in whatever way you include external CSS in your project. There are a lot of stylesheets to manage, so there is a simplified import in every component called "styles" that will work for anyone using a CSS Loader (this is the default for Create React App users).

```jsx
/** Simplified ES6 imports for people using URL Loaders */
import '@rmwc/button/dist/styles';
import '@rmwc/avatar/dist/styles';
```

**Warning** If you're using this method with tree shaking turned on, make sure to include css in your package.json sideEffects. `"sideEffects": [ "*.css" ]` https://github.com/jamesmfriedman/rmwc/issues/545

```jsx
/** Importing individual stylesheets */
import '@material/button/dist/mdc.button.css';
import '@rmwc/icon/icon.css';
```

```html
<!-- Placing in the head of your HTML file -->
<link rel="stylesheet" type="text/css" href="node_modules/@material/button/dist/mdc.button.css">;
<link rel="stylesheet" type="text/css" href="node_modules/@rmwc/icon/icon.css">;
```

## Using Standard CSS

All of the components have the `material-components-web` classNames on them and you can add your own.

```jsx
/** in your JSX */
import { Button } from '@rmwc/button';

const MyComponent = props => (
  <Button className="my-custom-classname">Hello World</Button>
);
```

```css
/** in your CSS */
.my-custom-className {
    color: red;
}

.mdc-button {
    font-weight: bold;
}
```

## Using CSS Modules

Just add your className. If you need to target a node that is not directly exposed by RMWC, you can use the global modifier in your CSS. In this example, you can target the inner wrapper of a DrawerHeader.

```jsx
/** in your JSX */
import { DrawerHeader } from '@rmwc/drawer';
import styles from './my-style-sheet.css';

const MyComponent = props => (
  <DrawerHeader className={styles.myDrawerHeader}>Hello World</DrawerHeader>
);
```

```css
/** in your CSS */
.myDrawerHeader :global(.mdc-drawer__header-content) {
    color: red;
}
```

## Using the Styled Components library

### Basic Styling

Using RMWC with `styled-components` is a breeze. For most use cases the following code works well.

```jsx
import styled from 'styled-components';
import { Button } from '@rmwc/button';

const StyledButton = styled(Button)`
  // Your Styles Here.
`;
```

### Props Based Styling

You will eventually want some condition styles based on props passed into the component.

```jsx
import styled, { css } from 'styled-components';
import { Button } from '@rmwc/button';

const StyledButton = styled(({ isFullWidth, ...otherProps }) => (
  <Button {...otherProps} />
))`
  ${props =>
  props.isFullWidth
    ? css`
          // Styles for full width here
        `
    : css`
          // Styles for non full width here.
        `};
`;
```

### Make sure to consume props

```jsx
styled(({ isFullWidth, ...otherProps }) => <Button {...otherProps} />);
```

If you pass an invalid prop to a dom node, in this case `isFullWidth`, React will complain. Here we are stripping this prop out using object deconstruction, and then passing the remaining valid props to `Button`. However this doesn't strip the prop from being used in the styling.

### Adjusting RMWC props and styling.

You can take this to the next level with `Select` with the following code.

```jsx
import styled from 'styled-components';
import { Select } from '@rmwc/select';

const StyledSelect = styled(({ label, ...otherProps }) => (
  <Select
    cssOnly={window.matchMedia('(max-width: 767px)').matches}
    label={window.matchMedia('(min-width: 768px)').matches ? label : ''}
    placeholder={window.matchMedia('(max-width: 767px)').matches ? label : ''}
    {...otherProps}
  />
))`
  // Your Styles Here.
`;
```

Here we are toggling the use of `cssOnly`, `label`, and `placeholder` with a js media query.

### Advanced Component Styling.

Lets say you want an icon in `Select` just like you can have it on `TextField`.

```jsx
import styled, { css } from 'styled-components';
import { TextFieldIcon } from '@rmwc/textField';
import { Select } from '@rmwc/select';

const BaseSelect = styled(({ label, ...otherProps }) => (
  <Select label={label} />
))`
  // ...
`;

const SelectIconRow = styled(({ children, filter, ...otherProps }) => (
  <div {...otherProps}>{children}</div>
))`
  // ...
`;

export default {
  Select: BaseSelect,
  SelectIconRow,

  SelectIcon: props => (
    <SelectIconRow filter={props.filter} value={props.value}>
            {props.children}
            <TextFieldIcon icon={props.icon} />
    </SelectIconRow>
  )
};
```

You can then import this and use it like so:

```jsx
<inputs.SelectIcon value={unit_type} icon="label">
    <inputs.Select
    label="Type"
    name="unit_type"
    onChange={event => this.onChange(event, 'unit_type')}
    options={[
      {
        label: 'Solid',
        value: 'solid'
      },
      {
        label: 'Liquid',
        value: 'liquid'
      },
      {
        label: 'Unit',
        value: 'unit'
      }
    ]}
    value={unit_type}
  />
</inputs.SelectIcon>
```

## Theming with runtime CSS variables.

You can easily theme the library at runtime using CSS variables. Inspect the `<html>` node in your web inspector and you should see a list of variables you can modify on the `:root` selector.

```css
/** in your main global CSS or style tag */
/** Use your browser's css inspector and inspect the HTML element to see other variables to override. */
:root {
    --mdc-theme-primary: pink;
    --mdc-theme-secondary: blue;
}
```


## Dark Mode

Earlier versions of `material-components-web` shipped with a built in Dark Mode but it has since be removed. You can now achieve similar results using RMWC's `ThemeProvider` component. Please refer to the `material-components-web` [documentation on theming.](https://material.io/components/web/docs/theming/)


## SASS Customization

Additional customization can be done through your own SASS build. This is a feature of the `material-components-web`, not RMWC. There are several options to modify components such as mixins and component specific SASS variables. Please refer to the [Material Web Components](https://material.io/develop/web/) documentation for that specific component.

For theming there are a couple of ways to implement theming. If you only import the theme variables and install the `@material/theme` library, it will only change the CSS custom property `--mdc-theme-[xxx]` used when generating the CSS so your colors will be set something like `var(--mdc-theme-primary,#6200ee)` where the `#6200ee` would still be the `material-components-web` default color. Browsers that do not support `var()` will still show the default color `#6200ee`. To get the fallback color to be the variable you're trying to set, you will need create scss files that import the material component's scss file from the material library with the desired variables set above...

```scss
$mdc-theme-primary: #0063dd;
$mdc-theme-secondary: #870186;

@import "@material/button/mdc-button";
@import "@material/checkbox/mdc-checkbox";
```

Please refer to the `material-components-web` [documentation on theming](https://material.io/components/web/docs/theming/) for more detailed information.


## Theme and ThemeProvider

Build on MDC Theme, RMWC has two theming components for extra easy useage. See component page [Theme](theme).
