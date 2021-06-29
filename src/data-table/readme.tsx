import React from 'react';

import { Docs, DocsExample, DocsSubtitle, DocProps, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell,
  SimpleDataTable
} from '.';

import { Select } from '../select';
import { Checkbox } from '../checkbox';
import { Switch } from '../switch';

export default function Readme() {
  return (
    <Docs
      title="Data Tables"
      lead="Data tables display sets of data."
      module="@rmwc/data-table"
      styles={[
        '@material/data-table/dist/mdc.data-table.css',
        '@rmwc/data-table/data-table.css',
        '@rmwc/icon/icon.css'
      ]}
      examples={examples}
    >
      <DocsSubtitle>Standard Table</DocsSubtitle>

      <DocsP>
        The DataTable components are intended to be flexible, properly styled,
        Material compliant HTML tables. Because of the complexities of working
        with datasets (especially large ones), the DataTable component DOES NOT
        handle pagination, data fetching, sorting, or performance of long lists.
      </DocsP>

      <DocsExample>
        {function Example() {
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
                        // @ts-ignore
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
        }}
      </DocsExample>

      <DocsSubtitle>Scrollable / Sticky Rows and Columns</DocsSubtitle>
      <DocsP>
        You can set a fixed sized for your table container to make it
        scrollable. Additionally, you can specify `stickyRows` or
        `stickyColumns` to affix rows or columns. Currently, only 1 row / column
        is supported but more may be supported in a future release.
      </DocsP>

      <DocsExample>
        {function Example() {
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
        }}
      </DocsExample>

      <DocsSubtitle>Form Controls</DocsSubtitle>

      <DocsP>
        DataTables play nice with the rest of the RMWC form controls. You are
        responsible for scripting your own selection behavior.
      </DocsP>

      <DocsExample>
        {function Example() {
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
                    // @ts-ignore
                    <DataTableRow key={i} selected={checked[i]}>
                      <DataTableCell hasFormControl>
                        <Checkbox
                          // @ts-ignore
                          checked={checked[i]}
                          onChange={(evt) => {
                            // @ts-ignore
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
        }}
      </DocsExample>

      <DocsSubtitle>Simplified Usage</DocsSubtitle>

      <DocsP>
        If you just need to throw a table on the screen, you can pass an array
        of data to SimpleDataTable.
      </DocsP>

      <DocsExample>
        <SimpleDataTable
          getRowProps={(row) => {
            return row[1] > 100 ? { activated: true } : {};
          }}
          getCellProps={(cell, index, isHead) => {
            const props = { isNumeric: index > 0, style: undefined };

            return !isHead && index === 2 && !cell.includes('$')
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
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'DataTable', component: DataTable },
          { displayName: 'DataTableRow', component: DataTableRow },
          { displayName: 'DataTableCell', component: DataTableCell },
          { displayName: 'DataTableHead', component: DataTableHead },
          { displayName: 'DataTableBody', component: DataTableBody },
          { displayName: 'DataTableHeadCell', component: DataTableHeadCell },
          { displayName: 'SimpleDataTable', component: SimpleDataTable }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <DataTable style={{ transform: 'scale(0.66)' }}>
    <DataTableContent>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell>Item</DataTableHeadCell>
          <DataTableHeadCell alignEnd>Quantity (Click Me)</DataTableHeadCell>
          <DataTableHeadCell alignEnd>Unit price</DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>Cookies</DataTableCell>
          <DataTableCell alignEnd>25</DataTableCell>
          <DataTableCell alignEnd>$2.90</DataTableCell>
        </DataTableRow>
        <DataTableRow activated>
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
