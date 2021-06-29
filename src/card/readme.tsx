import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons,
  CardMediaContent
} from '.';

import { Typography } from '../typography';
import { ListDivider } from '../list';

export default function Readme() {
  return (
    <Docs
      title="Cards"
      lead="Cards contain content and actions about a single subject."
      module="@rmwc/card"
      styles={[
        '@material/card/dist/mdc.card.css',
        '@material/button/dist/mdc.button.css',
        '@material/icon-button/dist/mdc.icon-button.css'
      ]}
      docsLink="https://material.io/develop/web/components/cards/"
      examples={examples}
    >
      <DocsSubtitle>Fully Featured Example</DocsSubtitle>

      <DocsExample>
        <Card style={{ width: '21rem' }}>
          <CardPrimaryAction>
            <CardMedia
              sixteenByNine
              style={{
                backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'
              }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <Typography use="headline6" tag="h2">
                Our Changing Planet
              </Typography>
              <Typography
                use="subtitle2"
                tag="h3"
                theme="textSecondaryOnBackground"
                style={{ marginTop: '-1rem' }}
              >
                by Kurt Wagner
              </Typography>
              <Typography
                use="body1"
                tag="div"
                theme="textSecondaryOnBackground"
              >
                Visit ten places on our planet that are undergoing the biggest
                changes today.
              </Typography>
            </div>
          </CardPrimaryAction>
          <CardActions>
            <CardActionButtons>
              <CardActionButton>Read</CardActionButton>
              <CardActionButton>Bookmark</CardActionButton>
            </CardActionButtons>
            <CardActionIcons>
              <CardActionIcon onIcon="favorite" icon="favorite_border" />
              <CardActionIcon icon="share" />
              <CardActionIcon icon="more_vert" />
            </CardActionIcons>
          </CardActions>
        </Card>
      </DocsExample>

      <DocsSubtitle>Article Preview Example</DocsSubtitle>

      <DocsExample>
        <Card outlined style={{ width: '21rem' }}>
          <Typography
            use="subtitle1"
            tag="div"
            style={{ padding: '0.5rem 1rem' }}
            theme="textSecondaryOnBackground"
          >
            Headlines
          </Typography>

          <ListDivider />

          <CardPrimaryAction>
            <div style={{ padding: '1rem' }}>
              <Typography use="headline5" tag="div">
                Copper on the rise
              </Typography>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                Copper price soars amid global market optimism and increased
                demand.
              </Typography>
            </div>
          </CardPrimaryAction>

          <ListDivider />

          <CardPrimaryAction>
            <div style={{ padding: '1rem' }}>
              <Typography use="headline5" tag="div">
                U.S. tech startups rebound
              </Typography>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                Favorable business conditions have allowed startups to secure
                more fundraising deals compared to last year.
              </Typography>
            </div>
          </CardPrimaryAction>

          <ListDivider />

          <CardPrimaryAction>
            <div style={{ padding: '1rem' }}>
              <Typography use="headline5" tag="div">
                Asia's clean energy ambitions
              </Typography>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                China plans to invest billions of dollars for the development of
                over 300 clean energy projects in Southeast Asia.
              </Typography>
            </div>
          </CardPrimaryAction>

          <ListDivider />

          <CardActions fullBleed>
            <CardActionButton
              label="All Business Headlines"
              trailingIcon="arrow_forward"
            />
          </CardActions>
        </Card>
      </DocsExample>

      <DocsSubtitle>Mini Card Example</DocsSubtitle>

      <DocsExample>
        <Card style={{ width: '12.5rem' }}>
          <CardPrimaryAction>
            <CardMedia
              square
              style={{
                backgroundImage: 'url(images/backgrounds/mb-bg-fb-06.png)'
              }}
            >
              <CardMediaContent>
                <Typography
                  use="subtitle2"
                  tag="div"
                  theme="textPrimaryOnDark"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundImage:
                      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    position: 'absolute'
                  }}
                >
                  Vacation Photos
                </Typography>
              </CardMediaContent>
            </CardMedia>
          </CardPrimaryAction>
          <CardActions>
            <CardActionIcons>
              <CardActionIcon onIcon="favorite" icon="favorite_border" />
              <CardActionIcon icon="bookmark_border" />
              <CardActionIcon icon="share" />
            </CardActionIcons>
          </CardActions>
        </Card>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Card', component: Card },
          { displayName: 'CardPrimaryAction', component: CardPrimaryAction },
          { displayName: 'CardMedia', component: CardMedia },
          { displayName: 'CardMediaContent', component: CardMediaContent },
          { displayName: 'CardActions', component: CardActions },
          { displayName: 'CardActionButtons', component: CardActionButtons },
          { displayName: 'CardActionIcons', component: CardActionIcons },
          { displayName: 'CardActionIcon', component: CardActionIcon },
          { displayName: 'CardActionButton', component: CardActionButton }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Card style={{ width: '12.5rem', transform: 'scale(0.5)' }}>
    <CardPrimaryAction>
      <CardMedia
        square
        style={{
          backgroundImage: 'url(images/backgrounds/mb-bg-fb-06.png)'
        }}
      >
        <CardMediaContent>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textPrimaryOnDark"
            style={{
              padding: '0.5rem 1rem',
              backgroundImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
              bottom: '0',
              left: '0',
              right: '0',
              position: 'absolute'
            }}
          >
            Vacation Photos
          </Typography>
        </CardMediaContent>
      </CardMedia>
    </CardPrimaryAction>
    <CardActions>
      <CardActionIcons>
        <CardActionIcon onIcon="favorite" icon="favorite_border" />
        <CardActionIcon icon="bookmark_border" />
        <CardActionIcon icon="share" />
      </CardActionIcons>
    </CardActions>
  </Card>
);
