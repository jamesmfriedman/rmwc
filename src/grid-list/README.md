# Grid Lists

Grid lists are an alternative to standard list views.

- Module **@rmwc/grid-list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/grid-list/styles';
  - Or include stylesheets
    - **'@material/grid-list/dist/mdc.grid-list.css'**
- MDC Docs: [https://material.io/components/web/catalog/grid-lists/](https://material.io/components/web/catalog/grid-lists/)

```jsx
function Example() {
  const [state, setState] = React.useState({
    tileGutter1: false,
    headerCaption: false,
    twolineCaption: false,
    withIconAlignStart: false,
    tileAspect: '1x1'
  });

  return (
    <>
      <GridList
        tileGutter1={state.tileGutter1}
        headerCaption={state.headerCaption}
        twolineCaption={state.twolineCaption}
        withIconAlignStart={state.withIconAlignStart}
        tileAspect={state.tileAspect}
      >
        {Array(8)
          .fill(undefined)
          .map((val, i) => (
            <GridTile key={i}>
              <GridTilePrimary>
                <GridTilePrimaryContent
                  src="images/backgrounds/mb-bg-fb-06.png"
                  alt="test"
                />
              </GridTilePrimary>
              <GridTileSecondary>
                <GridTileIcon icon="info" />
                <GridTileTitle>Tile {i + 1}</GridTileTitle>
              </GridTileSecondary>
            </GridTile>
          ))}
      </GridList>

      {[
        'tileGutter1',
        'headerCaption',
        'twoLineCaption',
        'withIconAlignStart'
      ].map((key) => (
        <Checkbox
          key={key}
          label={key}
          onChange={(evt) =>
            setState({ ...state, [key]: evt.currentTarget.checked })
          }
        />
      ))}

      <Select
        value={state.tileAspect}
        onChange={(evt) =>
          setState({
            ...state,
            tileAspect: String(evt.currentTarget.value)
          })
        }
        label="tileAspect"
        options={['1x1', '16x9', '2x3', '3x2', '4x3', '3x4']}
      />
    </>
  );
}
```

## GridList
Grid List Component

### Props

| Name | Type | Description |
|------|------|-------------|
| `headerCaption` | `undefined \| false \| true` | Move the caption to the top of the card. |
| `tileAspect` | `"1x1" \| "16x9" \| "2x3" \| "3x2" \| "4x3" \| "3x4"` | One of the following values: 1x1, 16x9, 2x3, 3x2, 4x3, 3x4. |
| `tileGutter1` | `undefined \| false \| true` | Use a 1px gutter. |
| `twolineCaption` | `undefined \| false \| true` | Make the caption two lines. |
| `withIconAlignStart` | `undefined \| false \| true` | Leaves space for a start aligned icon. |


## GridTile
A grid tile



## GridTileIcon
The icon for a Grid tile. This is an instance of Icon component.



## GridTilePrimary
The primary content for a Grid tile



## GridTileSecondary
The secondary content for a Grid tile



## GridTileTitleSupportText
Supporting Text for the Grid Tile



## GridTileTitle
The title for a Grid tile



