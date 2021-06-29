import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Avatar, AvatarGroup, AvatarCount } from '.';
import { Button } from '../button';
import { Chip } from '../chip';
import { TextField } from '../textfield';

export default function Readme() {
  return (
    <Docs
      title="Avatars"
      lead="Avatars are virtual representations of users in a system."
      module="@rmwc/avatar"
      styles={[
        '@rmwc/avatar/avatar.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      examples={examples}
      addon
    >
      <DocsExample label="Images">
        <>
          <Avatar
            src="images/avatars/blackwidow.png"
            size="xsmall"
            name="Natalia Alianovna Romanova"
          />
          <Avatar
            src="images/avatars/hulk.png"
            size="small"
            name="Bruce Banner"
          />
          <Avatar
            src="images/avatars/thor.png"
            size="medium"
            name="Thor Odinson"
          />
          <Avatar
            src="images/avatars/captainamerica.png"
            size="large"
            name="Steve Rogers"
          />
          <Avatar
            src="images/avatars/ironman.png"
            size="xlarge"
            name="Tony Stark"
          />
        </>
      </DocsExample>

      <DocsExample label="Initials Only">
        <>
          <Avatar name="Natalia Alianovna Romanova" size="xsmall" />
          <Avatar name="Bruce Banner" size="small" />
          <Avatar name="Thor Odinson" size="medium" />
          <Avatar name="Steve Rogers" size="large" />
          <Avatar name="Tony Stark" size="xlarge" />
        </>
      </DocsExample>

      <DocsExample label="Square Variant">
        <Avatar
          src="images/avatars/blackwidow.png"
          size="large"
          name="Natalia Alianovna Romanova"
          square
        />
      </DocsExample>

      <DocsExample label="Contained">
        <Avatar
          src="images/avatars/google.svg"
          size="large"
          contain
          name="Google"
          square
        />
      </DocsExample>

      <DocsSubtitle>Avatar Groups</DocsSubtitle>
      <DocsP>
        This is for Avatars that are displayed in a corellated grouping or list.
      </DocsP>

      <DocsExample label="Standard">
        <AvatarGroup>
          <Avatar
            src="images/avatars/captainamerica.png"
            name="Steve Rogers"
            size="large"
            interactive
          />
          <Avatar
            src="images/avatars/ironman.png"
            name="Tony Stark"
            size="large"
            interactive
          />
          <AvatarCount size="large" value={12} interactive />
        </AvatarGroup>
      </DocsExample>

      <DocsExample label="Dense">
        <AvatarGroup dense>
          <Avatar
            src="images/avatars/captainamerica.png"
            name="Steve Rogers"
            size="large"
            interactive
          />
          <Avatar
            src="images/avatars/ironman.png"
            name="Tony Stark"
            size="large"
            interactive
          />
          <AvatarCount size="large" overflow value={4} interactive />
        </AvatarGroup>
      </DocsExample>

      <DocsSubtitle>Usage with other components</DocsSubtitle>
      <DocsP>
        The avatar component has been designed to work nicely in any of the
        places you would use an icon.
      </DocsP>

      <DocsExample>
        <Button
          label="Enlist now!"
          icon={
            <Avatar
              src="images/avatars/captainamerica.png"
              name="Steve Rogers"
            />
          }
        />
      </DocsExample>
      <DocsExample>
        <Chip
          label="Hulk Smash"
          icon={<Avatar src="images/avatars/hulk.png" name="Bruce Banner" />}
        />
      </DocsExample>
      <DocsExample>
        <TextField
          label="Message Natalia..."
          outlined
          icon={
            <Avatar
              src="images/avatars/blackwidow.png"
              name="Natalia Alianovna Romanova"
              square
            />
          }
        />
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Avatar', component: Avatar },
          { displayName: 'AvatarGroup', component: AvatarGroup },
          { displayName: 'AvatarCount', component: AvatarCount }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <AvatarGroup dense>
    <Avatar
      src="images/avatars/captainamerica.png"
      name="Steve Rogers"
      size="large"
      interactive
    />
    <Avatar
      src="images/avatars/ironman.png"
      name="Tony Stark"
      size="large"
      interactive
    />
    <AvatarCount size="large" overflow value={4} interactive />
  </AvatarGroup>
);
