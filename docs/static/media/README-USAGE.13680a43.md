# Usage

> This document contains basic information on usage.

## Basic Example

Components should be imported from their relevant module.

```jsx
import { Button } from '@rmwc/button';

const MyComponent = props => <Button>Hello World</Button>;
```

## API Wide props

All components in RMWC are generated from a common factory method. This gives them some extra utility and flexibility when being used. The following props are available on (almost) every component.

### `dir="rtl"`

material-components-web implements right-to-left support for eastern languages. You can pass this prop to any component, please read [material-components-web rtl docs](https://material.io/components/web/catalog/rtl/) for more information.

```jsx
import { Drawer, DrawerContent } from '@rmwc/drawer';

<Drawer dir="rtl">
  <DrawerContent />
</Drawer>;
```

### `tag`

You can use the `tag` prop to specify the DOM element you would like to render. For advanced cases, you can actually pass a Component to render.

```jsx
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom';

// renders an h1
const Example1 = props => (
  <Typography tag="h1" use="headline4">
    Hello World
  </Typography>
);

// renders an anchor
const Example2 = props => (
  <Button tag="a" href="https://google.com">
    Hello World
  </Button>
);

// Advanced case, extend another component
const Example3 = props => (
  <Button tag={Link} to="https://google.com">
    Advanced Case
  </Button>
);
```

### `theme`

The theming functionality from material-components-web is baked into every component. It works identically to the [`Theme` component's `use` prop](theme).

```jsx
import { Button } from '@rmwc/button';

<Button raised theme={['secondaryBg',  'onSecondary']}>
  With Theme
</Button>;
```

### `ref`

With the advent of ref forwarding in React 16.3, you can pass the `ref` prop to the majority of components to get access to their DomNodes. This currently only works on Stateless components like Elevation, Typography, and Grid.,

```jsx
import { Elevation } from '@rmwc/elevation';

// renders an h1

class Example1 extends React.Component {
  render() {
    return <Elevation ref={el => this.textField = el}>
  }
}
```
