# Library Integrations

> Some interesting ways you can use external libraries with RMWC.

## React Router

If you're using React Router, you're probably used to using the `Link` component to navigate around. You may have also experienced problems at some point where you're adding an anchor tag around an element that breaks layout.

RMWC mitigates this issue by allowing you to "extend" other components. This works because most of the underlying compontents in RMWC are just HTML elements like div, span, etc that you can override using the `tag` prop. You can specify your own tag which can also be another React component.

A note on using TypeScript and Flow Typed with this strategy. Flow tends to be extremely forgiving and not give you any issues with this approach. Typescript will complain that there are no props of type `x` on this component. Work is being done to mitigate these issues, but see the workaround below.

```jsx
import { Link } from 'react-router-dom';
import { Button } from '@rmwc/button';

{/* Not what you wanted, you expected the Button to be the anchor. */}
<Link to="/">
  <Button>Go Home</Button>
</Link>

{/* Also valid, but would require some custom CSS to layout properly */}
<Button><Link to="/">Go Home</Link></Button>

{/* This would make the button an anchor link, but not use React Routers history.pushState */}
<Button tag="a" href="/">Go Home</Button>

{/* Make it all work together! RMWC lets you make the button the link */}
<Button tag={Link} to="/">Go Home</Button>
```
