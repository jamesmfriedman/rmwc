import * as RMWC from '@rmwc/types';
import React from 'react';

import { classNames, useClassNames, Tag, createComponent, mergeRefs } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { ListContext } from './list-context';

/** A ListItem component. */
export interface ListItemProps extends RMWC.WithRippleProps {
  /** A modifier for a selected state. */
  selected?: boolean;
  /** A modifier for an active state. */
  activated?: boolean;
  /** A modifier for a disabled state. */
  disabled?: boolean;
}

/** A ListItem component. */
export const ListItem = withRipple({ surface: false })(
  createComponent<ListItemProps>(function ListItem(props, ref) {
    const liRef = React.createRef();
    const finalRef = ref ? mergeRefs(ref,liRef) : liRef
        
    const context = React.useContext(ListContext);
    const [index, setIndex] = React.useState<number>(-1);

    const getIndex = React.useCallback((): number => {
        const listElements: HTMLLIElement[] = 
        getListElements(liRef.current as HTMLLIElement);
      if (listElements) {
        return listElements.indexOf(liRef.current as HTMLLIElement);
      }
      return -1
    },[liRef])

    const getListElements = (li: HTMLLIElement): HTMLLIElement[]  =>  {
      if (li) {
        return [].slice.call(li.parentNode?.querySelectorAll('.mdc-list-item'));
      }
      return []; 
    }

    React.useEffect(() => {
      if (liRef.current && index === -1) { setIndex(getIndex()) }
    }, [liRef, index, getIndex])

    React.useEffect(() => {
      if (index > -1 && props.disabled !== undefined) {
        // let the foundation handle disabled items--it also handles aria updates
        context.setEnabled(index,!props.disabled)
      }
    },[index, props.disabled, context])

    const { selected, activated, disabled, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-list-item',  ...context.getClassName(index),
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated,
      }
    ]);
    
    return ( <Tag tag="li" tabIndex={0} {...rest} className={className} ref={finalRef} /> )

  })
);

ListItem.displayName = 'ListItem';

/** Text Wrapper for the ListItem */
export interface ListItemTextProps {}

/** Text Wrapper for the ListItem */
export const ListItemText = createComponent<ListItemTextProps>(
  function ListItemText(props, ref) {
    const className = useClassNames(props, ['mdc-list-item__text']);
    return <Tag tag="span" {...props} ref={ref} className={className} />;
  }
);

/** Primary Text for the ListItem */
export interface ListItemPrimaryTextProps {}

/** Primary Text for the ListItem */
export const ListItemPrimaryText = createComponent<ListItemPrimaryTextProps>(
  function ListItemPrimaryText(props, ref) {
    const className = useClassNames(props, ['mdc-list-item__primary-text']);
    return <Tag tag="span" {...props} ref={ref} className={className} />;
  }
);

/** Secondary text for the ListItem */
export interface ListItemSecondaryTextProps {}

/** Secondary text for the ListItem */
export const ListItemSecondaryText = createComponent<
  ListItemSecondaryTextProps
>(function ListItemSecondaryText(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__secondary-text']);
  return <Tag tag="span" {...props} ref={ref} className={className} />;
});

/** A graphic / icon for the ListItem */
export interface ListItemGraphicProps extends IconProps {}

/** A graphic / icon for the ListItem */
export const ListItemGraphic = createComponent<ListItemGraphicProps>(
  function ListItemGraphic(props, ref) {
    const className = useClassNames(props, ['mdc-list-item__graphic']);
    return (
      <Icon {...props} aria-hidden="true" ref={ref} className={className} />
    );
  }
);

/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */
export interface ListItemMetaProps extends IconProps {}

/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */
export const ListItemMeta = createComponent<ListItemMetaProps>(
  function ListItemMeta(props, ref) {
    const className = useClassNames(props, ['mdc-list-item__meta']);

    if (!!props.icon) {
      return (
        <Icon {...props} aria-hidden="true" ref={ref} className={className} />
      );
    }

    if (React.isValidElement(props.children)) {
      const { children, ...rest } = props;
      return React.cloneElement(props.children, {
        ...rest,
        ...props.children.props,
        className: classNames(className, props.children.props.className)
      });
    }

    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** A container to group ListItems */
export interface ListGroupProps {}

/** A container to group ListItems */
export const ListGroup = createComponent<ListGroupProps>(function ListGroup(
  props,
  ref
) {
  const className = useClassNames(props, ['mdc-list-group']);
  return <Tag {...props} ref={ref} className={className} />;
});

/** A subheader for the ListGroup */
export interface ListGroupSubheaderProps {}

/** A subheader for the ListGroup */
export const ListGroupSubheader = createComponent<ListGroupSubheaderProps>(
  function ListGroupSubheader(props, ref) {
    const className = useClassNames(props, ['mdc-list-group__subheader']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** A divider for the List */
export interface ListDividerProps {}

/** A divider for the List */
export const ListDivider = createComponent<ListDividerProps>(
  function ListDivider(props, ref) {
    const className = useClassNames(props, ['mdc-list-divider']);
    return (
      <Tag
        tag="li"
        role="separator"
        {...props}
        ref={ref}
        className={className}
      />
    );
  }
);

/** A simple list item template. */
export interface SimpleListItemProps extends ListItemProps {
  /** Text for the ListItem. */
  text?: React.ReactNode;
  /** Secondary Text for the ListItem. */
  secondaryText?: React.ReactNode;
  /** A graphic icon for the ListItem. */
  graphic?: RMWC.IconPropT;
  /** A meta icon for the ListItem */
  metaIcon?: RMWC.IconPropT;
  /** Meta content for the ListItem instead of an icon. */
  meta?: React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
}

/** A simple list item template. */
export const SimpleListItem = createComponent<SimpleListItemProps>(
  (
    { text, secondaryText, graphic, metaIcon, meta, children, ...rest },
    ref
  ) => {
    const primaryTextToRender =
      text && secondaryText !== undefined ? (
        <ListItemPrimaryText>{text}</ListItemPrimaryText>
      ) : (
        text
      );

    const secondaryTextToRender =
      secondaryText !== undefined ? (
        <ListItemSecondaryText>{secondaryText}</ListItemSecondaryText>
      ) : null;

    return (
      <ListItem {...rest} ref={ref}>
        {graphic !== undefined && <ListItemGraphic icon={graphic} />}
        {secondaryTextToRender !== null ? (
          <ListItemText>
            {primaryTextToRender}
            {secondaryTextToRender}
          </ListItemText>
        ) : (
          primaryTextToRender
        )}
        {(!!meta || !!metaIcon) && (
          <ListItemMeta icon={metaIcon}>{meta}</ListItemMeta>
        )}

        {children}
      </ListItem>
    );
  }
);
