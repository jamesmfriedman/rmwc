import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples-variants.json';

import {
  List,
  ListItem,
  ListGroupSubheader,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
  ListDivider,
  ListGroup,
  SimpleListItem
} from '.';

import { Avatar } from '../avatar';
import { Checkbox } from '../checkbox';
import { Switch } from '../switch';
import { Radio } from '../radio';

export default function Readme() {
  return (
    <Docs
      title="Lists"
      lead="Lists are continuous, vertical indexes of text or images."
      module="@rmwc/list"
      styles={['@material/list/dist/mdc.list.css']}
      docsLink="https://material.io/develop/web/components/lists/"
      examples={examples}
    >
      <DocsSubtitle>Two Line</DocsSubtitle>
      <DocsP>
        When using the `twoLine` prop, you have to wrap the contents of the
        `ListItem` in `ListItemText`.
      </DocsP>

      <DocsExample>
        <List twoLine>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Cookies</ListItemPrimaryText>
              <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Pizza</ListItemPrimaryText>
              <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Icecream</ListItemPrimaryText>
              <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
        </List>
      </DocsExample>

      <DocsSubtitle>Leading and Trailing Icons</DocsSubtitle>

      <DocsExample>
        <List>
          <ListItem>
            <ListItemGraphic icon="favorite" />
            Leading
          </ListItem>
          <ListItem>
            Trailing
            <ListItemMeta icon="star" />
          </ListItem>
          <ListItem>
            <ListItemGraphic icon="wifi" />
            Leading and Trailing
            <ListItemMeta icon="info" />
          </ListItem>
          <ListItem>
            <ListItemGraphic icon="wifi" />
            Leading with Trailing Text
            <ListItemMeta>HELLO!</ListItemMeta>
          </ListItem>
        </List>
      </DocsExample>

      <DocsSubtitle>Avatar List with Dividers</DocsSubtitle>

      <DocsExample>
        <List twoLine avatarList>
          <ListGroup>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/blackwidow.png"
                    size="xsmall"
                    name="Natalia Alianovna Romanova"
                  />
                }
              />
              Natalia Alianovna Romanova
              <ListItemMeta icon="info" />
            </ListItem>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/hulk.png"
                    size="small"
                    name="Bruce Banner"
                  />
                }
              />
              Bruce Banner
              <ListItemMeta icon="info" />
            </ListItem>
          </ListGroup>
          <ListDivider />
          <ListGroup>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/thor.png"
                    size="medium"
                    name="Thor Odinson"
                  />
                }
              />
              Thor Odinson
              <ListItemMeta icon="info" />
            </ListItem>
          </ListGroup>
        </List>
      </DocsExample>

      <DocsSubtitle>Selectable</DocsSubtitle>
      <DocsP>
        Checkboxes and Radios can be included as part of `ListItemMeta`. It is
        recommended when using these that you are using controlled components,
        and that you put your interaction handler on the `ListItem` itself.
        Notice the `readOnly` prop is also set on the individual form elements.
      </DocsP>

      <DocsExample label="Checkboxes">
        {function Example() {
          const [checked, setChecked] = React.useState<any>({
            Cookies: false,
            Pizza: false,
            Icecream: false
          });

          return (
            <List>
              {['Cookies', 'Pizza', 'Icecream'].map((key) => (
                <ListItem
                  key={key}
                  onClick={() =>
                    setChecked({ ...checked, [key]: !checked[key] })
                  }
                >
                  {key}
                  <ListItemMeta>
                    <Checkbox checked={checked[key]} readOnly />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocsExample label="Switches">
        {function Example() {
          const [checked, setChecked] = React.useState<any>({
            Cookies: false,
            Pizza: false,
            Icecream: false
          });

          return (
            <List>
              {['Cookies', 'Pizza', 'Icecream'].map((key) => (
                <ListItem
                  key={key}
                  onClick={() =>
                    setChecked({ ...checked, [key]: !checked[key] })
                  }
                >
                  {key}
                  <ListItemMeta>
                    <Switch checked={checked[key]} readOnly />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocsExample label="Radios">
        {function Example() {
          const [checked, setChecked] = React.useState('Cookies');

          return (
            <List>
              {['Cookies', 'Pizza', 'Icecream'].map((key) => (
                <ListItem key={key} onClick={() => setChecked(key)}>
                  {key}
                  <ListItemMeta>
                    <Radio checked={checked === key} readOnly />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'List', component: List },
          { displayName: 'ListItem', component: ListItem },
          {
            displayName: 'ListItemPrimaryText',
            component: ListItemPrimaryText
          },
          {
            displayName: 'ListItemSecondaryText',
            component: ListItemSecondaryText
          },
          { displayName: 'ListItemGraphic', component: ListItemGraphic },
          { displayName: 'ListItemMeta', component: ListItemMeta },
          { displayName: 'ListDivider', component: ListDivider },
          { displayName: 'ListGroup', component: ListGroup },
          { displayName: 'ListGroupSubheader', component: ListGroupSubheader },
          { displayName: 'SimpleListItem', component: SimpleListItem }
        ]}
      />
    </Docs>
  );
}
