import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  SimpleListItem
} from '.';

export default function Readme() {
  return (
    <Docs
      title="Lists"
      lead="Lists are continuous, vertical indexes of text or images."
      module="@rmwc/list"
      styles={[
        '@material/list/dist/mdc.list.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/icon/icon.css'
      ]}
      docsLink="https://material.io/develop/web/components/lists/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>

      <DocsExample label="Default">
        <List>
          <ListItem>Cookies</ListItem>
          <ListItem>Pizza</ListItem>
          <ListItem>Icecream</ListItem>
        </List>
      </DocsExample>

      <DocsExample label="Fully Featured">
        <List twoLine>
          <ListItem>
            <ListItemGraphic icon="star_border" />
            <ListItemText>
              <ListItemPrimaryText>Cookies</ListItemPrimaryText>
              <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
            </ListItemText>
            <ListItemMeta icon="info" />
          </ListItem>
          <ListItem>
            <ListItemGraphic icon="local_pizza" />
            <ListItemText>
              <ListItemPrimaryText>Pizza</ListItemPrimaryText>
              <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
            </ListItemText>
            <ListItemMeta icon="info" />
          </ListItem>
          <ListItem activated>
            <ListItemGraphic icon="mood" />
            <ListItemText>
              <ListItemPrimaryText>Icecream</ListItemPrimaryText>
              <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
            </ListItemText>
            <ListItemMeta>Winner!</ListItemMeta>
          </ListItem>
        </List>
      </DocsExample>

      <DocsSubtitle>Simplified Usage</DocsSubtitle>
      <DocsP>
        While there are siutations where you would need / want to compose the
        entire list yourself, it can be quite verbose. `SimpleListItem` provides
        a compact syntax that allows you to pass all options as props. The
        following example is roughly equivalent to the one above.
      </DocsP>

      <DocsExample label="Simple">
        <List twoLine>
          <SimpleListItem
            graphic="star_border"
            text="Cookies"
            secondaryText="Chocolate chip"
            metaIcon="info"
          />
          <SimpleListItem
            graphic="local_pizza"
            text="Pizza"
            secondaryText="Pepperoni"
            metaIcon="info"
          />
          <SimpleListItem
            activated
            graphic="mood"
            text="Icecream"
            secondaryText="Chocolate cookie dough"
            meta="Winner!"
          />
        </List>
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

export const galleryExample = (
  <List twoLine style={{ transform: 'scale(0.75)' }}>
    <SimpleListItem
      graphic="star_border"
      text="Cookies"
      secondaryText="Chocolate chip"
      metaIcon="info"
    />
    <SimpleListItem
      graphic="local_pizza"
      text="Pizza"
      secondaryText="Pepperoni"
      metaIcon="info"
    />
    <SimpleListItem
      activated
      graphic="mood"
      text="Icecream"
      secondaryText="Chocolate cookie dough"
      meta="Winner!"
    />
  </List>
);
