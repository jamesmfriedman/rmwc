import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Tooltip } from '.';
import { IconButton } from '../icon-button';
import { Button } from '../button';
import { Avatar } from '../avatar';
import { RMWCProvider } from '../provider';

export default function Readme() {
  return (
    <Docs
      title="Tooltips"
      lead="Tooltips display informative text when users hover over, focus on, or tap an element."
      module="@rmwc/tooltip"
      styles={['@rmwc/tooltip/tooltip.css']}
      examples={examples}
      addon
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        Wrap any component in a `Tooltip` and provide the content attribute. The
        only requirement is that is has a single React child, and that the child
        can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick`
        props.
      </DocsP>
      <DocsExample label="Default">
        <>
          <Tooltip content="Cookies">
            <IconButton icon="star_border" />
          </Tooltip>

          <Tooltip content="Pizza">
            <IconButton icon="favorite_border" />
          </Tooltip>

          <Tooltip content="Icecream">
            <IconButton icon="mood" />
          </Tooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>
      <DocsExample label="With Arrow">
        <Tooltip content="Cake" showArrow>
          <IconButton icon="cake" />
        </Tooltip>
      </DocsExample>

      <DocsExample label="Controlled / Always open">
        <Tooltip content="Hello" align="right" open={true}>
          <IconButton icon="mood" />
        </Tooltip>
      </DocsExample>
      <DocsExample label="Rich Content">
        <Tooltip
          content={
            <div style={{ display: 'flex' }}>
              <Avatar
                src="images/avatars/captainamerica.png"
                size="large"
                name="Steve Rogers"
              />
              <div style={{ marginLeft: '0.5rem' }}>
                <b>Captain America</b>
                <div>Steve Rogers</div>
              </div>
            </div>
          }
        >
          <span role="button">S. Rogers</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Styled content">
        <Tooltip
          /** You make something like a popover window by just styling your inner content. */
          content={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                width: '20rem',
                height: '8rem',
                color: 'black',
                borderRadius: '3px',
                margin: '0 -3px'
              }}
            >
              Hello World!
            </div>
          }
        >
          <span role="button">Popover Window</span>
        </Tooltip>
      </DocsExample>
      <DocsExample label="Delay">
        <>
          <Tooltip content="Cookies" enterDelay={1000}>
            <Button label="Enter Delay" />
          </Tooltip>

          <Tooltip content="Pizza" leaveDelay={1000}>
            <Button label="Leave Delay" />
          </Tooltip>

          <Tooltip content="Icecream" enterDelay={1000} leaveDelay={1000}>
            <Button label="Both" />
          </Tooltip>
        </>
      </DocsExample>
      <DocsExample label="Alignment">
        {function AlignmentExample() {
          return [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight'
          ].map((align) => (
            //@ts-ignore
            <Tooltip key={align} content={`Align: ${align}`} align={align}>
              <IconButton icon="trip_origin" />
            </Tooltip>
          ));
        }}
      </DocsExample>

      <DocsSubtitle>Activation</DocsSubtitle>
      <DocsP>
        By default, tooltips will activate on hover and focus. You can change
        this behavior by passing one or more options to the `activateOn` prop.
      </DocsP>

      <DocsExample label="Default">
        <>
          <Tooltip content="Cookies" activateOn="hover">
            <Button label="Hover" />
          </Tooltip>
          ''
          <Tooltip content="Pizza" activateOn="click">
            <Button label="Click" />
          </Tooltip>
          <Tooltip content="Icecream" activateOn="focus">
            <Button label="Focus" />
          </Tooltip>
          <Tooltip content="Cake" activateOn={['hover', 'focus']}>
            <Button label="Multiple" />
          </Tooltip>
        </>
      </DocsExample>

      <DocsSubtitle>Usage with RMWCProvider</DocsSubtitle>
      <DocsP>
        The RMWCProvider allows you to specify global defaults for your
        tooltips.
      </DocsP>

      <DocsExample label="Using Provider">
        <RMWCProvider
          tooltip={{
            align: 'right',
            activateOn: 'hover',
            showArrow: true,
            leaveDelay: 500,
            enterDelay: 0
          }}
        >
          <Tooltip content="Hello World!">
            <Button label="With Provider" />
          </Tooltip>
        </RMWCProvider>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Tooltip', component: Tooltip }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <>
    <Tooltip content="Favorite RMWC!" open>
      <IconButton icon="favorite_outline" />
    </Tooltip>
  </>
);
