# Tabs

Tabs make it easy to explore and switch between different views.

- Module **@rmwc/tabs**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/tabs/styles';
  - Or include stylesheets
    - **'@material/tab-bar/dist/mdc.tab-bar.css'**
    - **'@material/tab/dist/mdc.tab.css'**
    - **'@material/tab-scroller/dist/mdc.tab-scroller.css'**
    - **'@material/tab-indicator/dist/mdc.tab-indicator.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/tabs/tab-bar/](https://material.io/develop/web/components/tabs/tab-bar/)

## Basic Usage

Tabs can be either controlled or uncontrolled just like inputs. Use the `activeTabIndex` and `onActivate` callback for controlled components.

```jsx
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>
```

```jsx
function Example() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <TabBar
      activeTabIndex={activeTab}
      onActivate={(evt) => setActiveTab(evt.detail.index)}
    >
      <Tab>Cookies</Tab>
      <Tab>Pizza</Tab>
      <Tab>Icecream</Tab>
    </TabBar>
  );
}
```

## Variants

```jsx
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>
```

```jsx
<TabBar>
  <Tab icon="star_border" label="Cookies" />
  <Tab icon="favorite_border" label="Pizza" />
  <Tab icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  <Tab icon="star_border" />
  <Tab icon="favorite_border" />
  <Tab icon="mood" />
</TabBar>
```

```jsx
<TabBar>
  <Tab stacked icon="star_border" label="Cookies" />
  <Tab stacked icon="favorite_border" label="Pizza" />
  <Tab stacked icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  <Tab stacked restrictIndicator icon="star_border" label="Cookies" />
  <Tab stacked restrictIndicator icon="favorite_border" label="Pizza" />
  <Tab stacked restrictIndicator icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  {/* Tabs automatically scroll with lots of content. */}
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
  <Tab>Chocolate</Tab>
  <Tab>Fishsticks</Tab>
  <Tab>Ratatouille</Tab>
  <Tab>Bread</Tab>
  <Tab>Rolls</Tab>
  <Tab>Sushi</Tab>
  <Tab>Cupcake</Tab>
  <Tab>Cheesecake</Tab>
</TabBar>
```

## Transitions

```jsx
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>
```

## Icons as Indicators

`material-components-web` has some light support for using icons as indicators (it's buried in their docs but there are no working examples or demos). Support has been added to RMWC, but your mileage may vary since it will require quite a bit of manual positioning and styling. By default, the icons appear full size at the center of the tab, effectively making them overlay images.

```jsx
<TabBar>
  <Tab iconIndicator="star">Cookies</Tab>
  <Tab iconIndicator="favorite">Pizza</Tab>
  <Tab iconIndicator="mood">Icecream</Tab>
</TabBar>
```

```jsx
function IconIndicatorExample() {
  const style = {
    transformOrigin: 'center center',
    transform: 'translateY(1rem) scale(0.45)'
  };

  return (
    <TabBar>
      <Tab
        label="Cookies"
        iconIndicator={{
          icon: 'star',
          style: style
        }}
      />
      <Tab
        label="Pizza"
        iconIndicator={{
          icon: 'favorite',
          style: style
        }}
      />
      <Tab
        label="Icecream"
        iconIndicator={{
          icon: 'mood',
          style: style
        }}
      />
    </TabBar>
  );
}
```

## TabBar
The TabBar component

### Props

| Name | Type | Description |
|------|------|-------------|
| `activeTabIndex` | `undefined \| number` | The index of the active tab. |
| `foundationRef` | `React.Ref<MDCTabBarFoundation \| null>` | Advanced: A reference to the MDCFoundation. |
| `indicatorTransition` | `"slide" \| "fade"` | Specifies whether the indicator should slide or fade. Defaults to slide. |
| `onActivate` | `undefined \| (evt: TabBarOnActivateEventT) => void` | Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. evt.detail = { index: number; } |


## Tab
A Tab component

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | The label for the tab, passed as children. |
| `focusOnActivate` | `undefined \| false \| true` | Focuses the tab when activated. Defaults to true. |
| `foundationRef` | `React.Ref<MDCTabFoundation \| null>` | Advanced: A reference to the MDCFoundation. |
| `icon` | `RMWC.IconPropT` | The icon to use for the tab. |
| `iconIndicator` | `RMWC.IconPropT` | Optionally use a custom icon for the active indicator, instead of the underline. |
| `label` | `any` | A label for the tab. |
| `minWidth` | `undefined \| false \| true` | Indicates that the tab should shrink in size to be as narrow as possible without causing text to wrap. |
| `onInteraction` | `undefined \| (evt: TabOnInteractionEventT) => void` | Fires when a tab has been interacted with. This is captures both keyboard and click events. evt.detail = { tabId: string } |
| `restrictIndicator` | `undefined \| false \| true` | Restricts the indicator to the content |
| `stacked` | `undefined \| false \| true` | Stacks the icon on top of the text label |


