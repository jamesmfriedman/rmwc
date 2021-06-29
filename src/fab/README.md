# Fabs

A floating action button (FAB) represents the primary action of a screen.

- Module **@rmwc/fab**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/fab/styles';
  - Or include stylesheets
    - **'@material/fab/dist/mdc.fab.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/buttons/floating-action-buttons/](https://material.io/develop/web/components/buttons/floating-action-buttons/)

```jsx
<Fab icon="favorite" />
```

```jsx
<Fab icon="favorite" mini />
```

```jsx
<>
  <Fab icon="add" label="Create" />
  <Fab trailingIcon="add" label="Create" />
  <Fab label="Label only" />
</>
```

```jsx
<>
  <Fab icon="favorite_outline" theme={['primaryBg', 'onPrimary']} />
  <Fab
    icon="delete"
    style={{ backgroundColor: 'var(--mdc-theme-error)' }}
    theme={['onError']}
  />
</>
```

## Fab
A floating action button component

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content specified as children. |
| `exited` | `undefined \| false \| true` | Animates the FAB out of view. When this class is removed, the FAB will return to view. |
| `icon` | `RMWC.IconPropT` | The icon for the FAB |
| `label` | `React.ReactNode &amp; any` | Make the Fab extended with a label. |
| `mini` | `undefined \| false \| true` | Make the Fab smaller. |
| `trailingIcon` | `RMWC.IconPropT` | A trialing icon for the FAB |


