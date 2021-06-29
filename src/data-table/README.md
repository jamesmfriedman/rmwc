# Data Tables

Data tables display sets of data.

- Module **@rmwc/data-table**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/data-table/styles';
  - Or include stylesheets
    - **'@material/data-table/dist/mdc.data-table.css'**
    - **'@rmwc/data-table/data-table.css'**
    - **'@rmwc/icon/icon.css'**


## Standard Table

The DataTable components are intended to be flexible, properly styled, Material compliant HTML tables. Because of the complexities of working with datasets (especially large ones), the DataTable component DOES NOT handle pagination, data fetching, sorting, or performance of long lists.

```jsx
function Example() {
  const [sortDir, setSortDir] = React.useState(null);
  return (
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Item</DataTableHeadCell>
            <DataTableHeadCell
              alignEnd
              sort={sortDir}
              onSortChange={(sortDir) => {
                setSortDir(sortDir);
                console.log(sortDir);
              }}
            >
              Quantity (Click Me)
            </DataTableHeadCell>
            <DataTableHeadCell alignEnd>Unit price</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Cookies</DataTableCell>
            <DataTableCell alignEnd>25</DataTableCell>
            <DataTableCell alignEnd>$2.90</DataTableCell>
          </DataTableRow>
          <DataTableRow selected>
            <DataTableCell>Pizza</DataTableCell>
            <DataTableCell alignEnd>50</DataTableCell>
            <DataTableCell alignEnd>$1.25</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Icecream</DataTableCell>
            <DataTableCell alignEnd>10</DataTableCell>
            <DataTableCell alignEnd>$2.35</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
}
```

## Scrollable / Sticky Rows and Columns

You can set a fixed sized for your table container to make it scrollable. Additionally, you can specify `stickyRows` or `stickyColumns` to affix rows or columns. Currently, only 1 row / column is supported but more may be supported in a future release.

```jsx
function Example() {
  const [rows, setRows] = React.useState(0);
  const [cols, setCols] = React.useState(0);
  const sampleColumns = Array(7).fill(undefined);
  const sampleRows = Array(50).fill(undefined);

  return (
    <>
      <DataTable
        style={{ height: '300px', width: '375px' }}
        stickyRows={rows}
        stickyColumns={cols}
      >
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>Label</DataTableHeadCell>
              {sampleColumns.map((v, i) => (
                <DataTableHeadCell key={i}>Header</DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {sampleRows.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>Label</DataTableCell>
                <DataTableCell>R{i} C1</DataTableCell>
                <DataTableCell>R{i} C2</DataTableCell>
                <DataTableCell>R{i} C3</DataTableCell>
                <DataTableCell>R{i} C4</DataTableCell>
                <DataTableCell>R{i} C5</DataTableCell>
                <DataTableCell>R{i} C6</DataTableCell>
                <DataTableCell>R{i} C7</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>

      <div className="doc-controls">
        <Select
          label="Sticky Rows"
          options={['0', '1']}
          value={String(rows)}
          onChange={(evt) => setRows(Number(evt.currentTarget.value))}
        />
        <Select
          label="Sticky Cols"
          options={['0', '1']}
          value={String(cols)}
          onChange={(evt) => setCols(Number(evt.currentTarget.value))}
        />
      </div>
    </>
  );
}
```

## Form Controls

DataTables play nice with the rest of the RMWC form controls. You are responsible for scripting your own selection behavior.

```jsx
function Example() {
  const [checked, setChecked] = React.useState({});
  const sampleRows = new Array(5).fill(undefined);

  return (
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell hasFormControl>
              <Checkbox />
            </DataTableHeadCell>
            <DataTableHeadCell>Label</DataTableHeadCell>
            <DataTableHeadCell>Header</DataTableHeadCell>
            <DataTableHeadCell>Header</DataTableHeadCell>
            <DataTableHeadCell>Toggle</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {sampleRows.map((v, i) => (
            <DataTableRow key={i} selected={checked[i]}>
              <DataTableCell hasFormControl>
                <Checkbox
                  checked={checked[i]}
                  onChange={(evt) => {
                    checked[i] = evt.currentTarget.checked;
                    setChecked({ ...checked });
                  }}
                />
              </DataTableCell>
              <DataTableCell>Label</DataTableCell>
              <DataTableCell>
                <Select
                  placeholder="--Select--"
                  options={['Cookies', 'Pizza', 'Icecream']}
                />
              </DataTableCell>
              <DataTableCell>R{i} C3</DataTableCell>
              <DataTableCell>
                <Switch />
              </DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
}
```

## Simplified Usage

If you just need to throw a table on the screen, you can pass an array of data to SimpleDataTable.

```jsx
<SimpleDataTable
  getRowProps={(row) => {
    return row[1] > 100 ? { activated: true } : {};
  }}
  getCellProps={(cell, index, isHead) => {
    const props = { isNumeric: index > 0, style: undefined };

    return !isHead &amp;&amp; index === 2 &amp;&amp; !cell.includes('$')
      ? { ...props, style: { color: 'red' } }
      : props;
  }}
  headers={[['Item', 'Quantity', 'Value']]}
  data={[
    ['Cookies', 25, '$12.40'],
    ['Pizza', 11, '$10.43'],
    ['Icecream', 3, '1.43'],
    ['Candy', 72, '$22.45'],
    ['Cakes', 101, '$215.05'],
    ['Muffins', 3, '$5.97']
  ]}
/>
```

## DataTable
The DataTable Component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `stickyColumns` | `undefined \| number` | The number of columns to affix to the side of the table when scrolling. |
| `stickyRows` | `undefined \| number` | The number of rows to affix to the top of the table when scrolling. |


## DataTableRow
A row for the data table.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined \| false \| true` | Styles the row in a bolder activated state. |
| `selected` | `undefined \| false \| true` | Styles the row in a selected state. |


## DataTableCell
A cell for the DataTable

### Props

| Name | Type | Description |
|------|------|-------------|
| `alignEnd` | `undefined \| false \| true` | Align content to the end of the cell. |
| `alignMiddle` | `undefined \| false \| true` | Align content to the middle of the cell. |
| `alignStart` | `undefined \| false \| true` | Align content to the start of the cell. |
| `hasFormControl` | `undefined \| false \| true` | Optionally Remove padding on the cell for checkboxes, radios, and switches. |
| `isNumeric` | `undefined \| false \| true` | Changes alignment for numeric columns |


## DataTableHead
A header for the data table.



## DataTableBody
A body for the data table.



## DataTableHeadCell
A header cell for the data table.

### Props

| Name | Type | Description |
|------|------|-------------|
| `alignEnd` | `undefined \| false \| true` | Align content to the end of the cell. |
| `alignMiddle` | `undefined \| false \| true` | Align content to the middle of the cell. |
| `alignStart` | `undefined \| false \| true` | Align content to the start of the cell. |
| `children` | `React.ReactNode` | Children to pass to the cell. |
| `hasFormControl` | `undefined \| false \| true` | Optionally Remove padding on the cell for checkboxes, radios, and switches. |
| `isNumeric` | `undefined \| false \| true` | Changes alignment for numeric columns |
| `onSortChange` | `undefined \| (dir: null \| number) => void` | A callback for when the sorting method changes. Null for not sorted, 1 for ascending, and -1 for descending. |
| `sort` | `null \| number` | Make the column sortable. Null for not sorted, 1 for ascending, and -1 for descending. |


## SimpleDataTable
A simple data table to render matrices.

### Props

| Name | Type | Description |
|------|------|-------------|
| `data` | `Array<any[]>` | Data to render. |
| `getCellProps` | `undefined \| (cell: any[], index: number, isHead: boolean) => Object` | A function that allows you to return custom props for a cell. |
| `getRowProps` | `undefined \| (row: any[], index: number, isHead: boolean) => Object` | A function that allows you to return custom props for a row. |
| `headers` | `Array<any[]>` | Table headers to render. |
| `stickyColumns` | `undefined \| number` | The number of columns to affix to the side of the table when scrolling. |
| `stickyRows` | `undefined \| number` | The number of rows to affix to the top of the table when scrolling. |


