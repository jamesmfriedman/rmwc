# Typings

> The Type system has been designed from the ground up to give you the most possible flexibility and control.

Theres nothing worse than using a third party library and not being able to do something because the creators forgot to implement it. This issue is usually compounded in UI libraries, because there are an infinite number of interactions that can take place.

RMWC addresses these issues while giving you the ability to lock down your api if you choose to do so. For Typescript, there are no additional steps to get started. RMWC ships with the Typescript declarations built in.

By default, (almost) all components take any HTML prop and will pass them on to the appropriate DOM node internally, which is generally the root of the component. This means you can pass `onClick`, `className`, `style`, and any other valid React HTMLProp to any component. These extra props aren't in the docs because it's a list thats literally 100's of props long.

```jsx
import { Button } from '@rmwc/button';

const MyComp = () => <Button
  label="Hello World"
  {/** Anything goes */}
  onClick={() => {}}
  onMousedown={() => {}}
  data-testid="my-button"
/>
```

All components have exported interfaces that you can patch. If the component is `Button` the interface is `ButtonProps`. In the event there is an error in the component api, or that you have a case where you need to add props, simply add them to the interface.

```jsx
import { Button } from '@rmwc/button';

// This will extend the ButtonProps interface
interface ButtonProps {
  myNewProp: string
}

const MyComp = () => <Button
  label="Hello World"
  myNewProp="Hello" //valid
/>
```

## Custom tag typing support

Most components in RMWC allow you to pass a `tag` prop to specify the HTML tag or component that should render instead of the default. This is useful for situations where you want to change behavior or semantics. One case that comes up frequently is using something like the `Link` component from React Router. Passing a new component to the tag prop will infer the props of that component and alert you of issues at build time.

```jsx
import { Link } from 'react-router-dom';
import { Button } from '@rmwc/button';

function Example() {
  return (
    <>
      {/** This is annoying and will cause styling issues... */}
      <Link to="http://example.com" >
        <Button label="My Link" />
      </Link>

      {/** Use the `tag` prop to override the buttons root component. */}
      <Button label="My Link" tag={Link} to="http://example.com" />

      {/** RMWC will give you typesafety out of the box for when you are extending components. */}
      {/** Error: Property `to` not found on Button. */}
      <Button label="My Link" to="http://example.com" />

      {/** Error: Link component requires Property `to`. */}
      <Button label="My Link" tag={Link} />

      

    </>
  )
}
```


## Handling in form controls

In certain places of the component api (mostly form controls) props spread to the form input by default to mimic interfacing with native form controls. In these cases, it's specifically called out in the docs and gives you the option to pass props to the root via `rootProps`.

```jsx
import { TextField } from '@rmwc/textfield';

const MyComp = () => <TextField
  value={this.state.value}
  onChange={evt => this.setState({value: evt.target.value})}
  {/** Passed to the input */}
  type="search"
  maxLength={100}
  {/** Pass additional props to the root */}
  rootProps={{
    'data-testid': 'my-textfield'
  }}
/>
```

## Restricting the component props surface

In the event you want to lock down the component interface, its as easy as importing the props for the component you want and wrapping the component. In the following example, `ButtonProps` doesn't include `React.HTMLProps`. Instead the definition internally is the equivalent of `Button: React.ComponentType<ButtonProps & RMWC.HTMLProps>`. This means that `ButtonProps` only contains the things explicitly unique to the button component.


```jsx
import { Button, ButtonProps } from '@rmwc/button';
import { HTMLProps } from '@rmwc/types';

// Extend the ButtonProps interface
interface RestrictiveButtonProps extends ButtonProps {}

const RestrictiveButton = (props: RestrictiveButtonProps) => <Button
  label="Hello World" // Works!
  onClick={props.onClick} // ERROR! Not included in ButtonProps 
/>

// Extend the ButtonProps interface and add our own items
interface FancyButtonProps extends ButtonProps {
  onClick: (evt: React.MouseEvent) => void
}

const FancyButton = (props: FancyButtonProps) => <Button
  label="Hello World" // Works!
  onClick={props.onClick} // Works!
  onMousedown={props.onMouseDown} // ERROR!
/>

// Extend the ButtonProps and ComponentProps (which includes everything)
interface EverythingButtonProps extends ButtonProps, HTMLProps {}

const EverythingButton = (props: EverythingButtonProps) => <Button
  label="Hello World" // Works!
  onClick={props.onClick} // Works!
  onMousedown={props.onMouseDown} // Works!
  aria-role="button" // Works!
  data-testid="foo" // Works!
/>
```
