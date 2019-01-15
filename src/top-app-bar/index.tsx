import { ComponentProps, CustomEventT, componentFactory } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';

import * as React from 'react';
// @ts-ignore
import { MDCTopAppBar } from '@material/top-app-bar';

import { Icon } from '@rmwc/icon';
import { withFoundation } from '@rmwc/base';

export interface TopAppAppBarPropsT extends ComponentProps {
  /** Emits when the navigation icon is clicked. */
  onNav?: (evt: CustomEventT<void>) => void;
  /** Styles the top app bar as a fixed top app bar. */
  fixed?: boolean;
  /** Styles the top app bar as a prominent top app bar. */
  prominent?: boolean;
  /** Styles the top app bar as a short top app bar. */
  short?: boolean;
  /** Styles the top app bar to always be collapsed. */
  shortCollapsed?: boolean;
  /** Styles the top app bar to be dense. */
  dense?: boolean;
}

export const TopAppBarRoot = componentFactory({
  displayName: 'TopAppBarRoot',
  tag: 'header',
  classNames: (props: TopAppAppBarPropsT) => [
    'mdc-top-app-bar',
    {
      'mdc-top-app-bar--fixed': props.fixed,
      'mdc-top-app-bar--prominent': props.prominent,
      'mdc-top-app-bar--short': props.short || props.shortCollapsed,
      'mdc-top-app-bar--short-collapsed': props.shortCollapsed,
      'mdc-top-app-bar--dense': props.dense
    }
  ],
  consumeProps: ['fixed', 'prominent', 'short', 'shortCollapsed', 'dense']
});

/** A row for the app bar. */
export const TopAppBarRow = componentFactory({
  displayName: 'TopAppBarRow',
  classNames: ['mdc-top-app-bar__row']
});

type TopAppBarSectionPropsT = {
  /** Aligns the section to the start. */
  alignStart?: boolean;
  /** Aligns the section to the end. */
  alignEnd?: boolean;
} & ComponentProps;

/** A section for the app bar. */
export const TopAppBarSection = componentFactory({
  displayName: 'TopAppBarSection',
  tag: 'section',
  classNames: (props: TopAppBarSectionPropsT) => [
    'mdc-top-app-bar__section',
    {
      'mdc-top-app-bar__section--align-start': props.alignStart,
      'mdc-top-app-bar__section--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignStart', 'alignEnd']
});

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export const TopAppBarNavigationIcon = componentFactory<IconProps>({
  displayName: 'TopAppBarNavigationIcon',
  classNames: ['mdc-top-app-bar__navigation-icon'],
  tag: Icon
});

/** Action items for the top app bar. This is an instance of the Icon component.*/
export const TopAppBarActionItem = componentFactory<IconProps>({
  displayName: 'TopAppBarActionItem',
  classNames: ['mdc-top-app-bar__action-item'],
  tag: Icon
});

/** A title for the top app bar. */
export const TopAppBarTitle = componentFactory({
  displayName: 'TopAppBarTitle',
  classNames: ['mdc-top-app-bar__title']
});

export interface TopAppBarFixedAdjustPropsT extends ComponentProps {
  /** Class used to style the content below the dense top app bar to prevent the top app bar from covering it. */
  dense?: boolean;
  /** Class used to style the content below the prominent top app bar to prevent the top app bar from covering it. */
  prominent?: boolean;
  /** Class used to style the content below the top app bar when styled as both prominent and dense, to prevent the top app bar from covering it. */
  denseProminent?: boolean;
  /** Class used to style the content below the short top app bar to prevent the top app bar from covering it. */
  short?: boolean;
}

/** An optional component to fill the space when the TopAppBar is fixed. Place it directly after the TopAppBar. */
export const TopAppBarFixedAdjust = componentFactory({
  displayName: 'TopAppBarFixedAdjust',
  classNames: (props: TopAppBarFixedAdjustPropsT) => [
    'mdc-top-app-bar--fixed-adjust',
    {
      'mdc-top-app-bar--dense-fixed-adjust': props.dense,
      'mdc-top-app-bar--prominent-fixed-adjust': props.prominent,
      'mdc-top-app-bar--dense-prominent-fixed-adjust': props.denseProminent,
      'mdc-top-app-bar--short-fixed-adjust': props.short
    }
  ],
  consumeProps: ['dense', 'denseProminent', 'prominent', 'short']
});

/** A TopAppBar component */
export class TopAppBar extends withFoundation({
  constructor: MDCTopAppBar,
  adapter: {}
})<TopAppAppBarPropsT> {
  static displayName = 'TopAppBar';

  render() {
    const { onNav, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <TopAppBarRoot {...rest} ref={root_} />;
  }
}

export type SimpleTopAppBarPropsT = {
  /** The title for the App Bar. */
  title?: React.ReactNode;
  /** An array of props that will be used to create TopAppBarActionItems. */
  actionItems?: Object[];
  /** Props for the NavigationIcon, which is an instance of the Icon component. You can also set this to `true` and use the `onNav` prop to handle interactions.*/
  navigationIcon?: Object | boolean;
  /** Additional content to place in the start section. */
  startContent?: React.ReactNode;
  /** Additional content to place in the end section. */
  endContent?: React.ReactNode;
} & TopAppAppBarPropsT;

/** A simplified syntax for creating an AppBar. */
export class SimpleTopAppBar extends React.Component<SimpleTopAppBarPropsT> {
  static displayName = 'SimpleTopAppBar';

  render() {
    const {
      title,
      actionItems,
      navigationIcon,
      startContent,
      endContent,
      ...rest
    } = this.props;
    return (
      <TopAppBar {...rest}>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            {!!navigationIcon && (
              <TopAppBarNavigationIcon
                icon="menu"
                {...(typeof navigationIcon === 'boolean' ? {} : navigationIcon)}
              />
            )}
            {!!title && <TopAppBarTitle>{title}</TopAppBarTitle>}
            {startContent}
          </TopAppBarSection>

          {(!!actionItems || endContent) && (
            <TopAppBarSection alignEnd>
              {endContent}
              {!!actionItems &&
                actionItems.map((actionItemProps, index) => (
                  <TopAppBarActionItem {...actionItemProps} key={index} />
                ))}
            </TopAppBarSection>
          )}
        </TopAppBarRow>
      </TopAppBar>
    );
  }
}