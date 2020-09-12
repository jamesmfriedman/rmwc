import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCListFoundation } from '@material/list';
import { Tag, useClassNames, createComponent, getDisplayName } from '@rmwc/base';
import { useListFoundation } from './foundation';
import { ListContext } from './list-context';

export type ListOnActionEventT = RMWC.CustomEventT<{ index: number }>;

/** A List Component */
export interface ListProps {
  /** Reduces the padding on List items. */
  dense?: boolean;
  /** Gives more space for dual lined list items. */
  twoLine?: boolean;
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean;
  /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
  nonInteractive?: boolean;
  /** A callback for when a list item is interacted with. evt.detail = number */
  onAction?: (evt: ListOnActionEventT) => void;
  /** An internal api used for cross component communication */
  apiRef?: (api: ListApi | null) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCListFoundation | null>;
  /** Sets the list to allow the up arrow on the first element to focus the
   * last element of the list and vice versa. Defaults to true */

  wrapFocus?: boolean;
  /** Sets the lists vertical orientation. Defaults to true */
  vertical?: boolean;
  /** sets the selectedIdex for singleSelection, radiogroup, or checkboxlist variants. Only supply number[] to checkboxlists */
  selectedIndex?: number[] | number;
  /** Children to render */
  children?: React.ReactNode;
}

export interface ListApi {
  listElements: () => HTMLLIElement[];
  focusRoot: () => void;
  getClasses: () => string;
  addClassToElementIndex: (index: number, className: string) => void;
  removeClassFromElementAtIndex: (index: number, className: string) => void;
  setAttributeForElementIndex: (
    index: number,
    attr: string,
    value: any
  ) => void;
  getListItemCount: () => number;
  focusItemAtIndex: (index: number) => void;
}

export const List = createComponent<ListProps>(function List(props, ref) {
  const {
    dense,
    twoLine,
    avatarList,
    apiRef,
    nonInteractive,
    onAction,
    foundationRef,
    wrapFocus,
    vertical,
    selectedIndex,
    children,
    ...rest
  } = props;
  const { rootEl, listItemClasses, setEnabled, role} = useListFoundation(props);

  
  const getListItemRole = (): {role?: string} => {
    // TODO(mgr34): menuitems with checkboxs or radios should be
    // menuitemcheckbox or menuitemradio respectively
    // see: https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox

    if (role === 'group') {
      return {role: 'checkbox'}
    }

    if (role === 'radiogroup') {
      return {role: 'radio'}
    }

    if (role === 'listbox' ) {
      return {role: 'option'}
    }

    return {}
  };

  const listItemValues = {
    getClassName: (index: number): string[]  =>  listItemClasses[index] || [],
    setEnabled
  };

  const className = useClassNames(props, [
    'mdc-list',
    {
      'mdc-list--dense': dense,
      'mdc-list--two-line': twoLine,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--non-interactive': nonInteractive
    }
  ]);
  
  const needsListItemsWrapper = (): boolean => 
    ['group','radiogroup','listbox'].some(val => val === role)

  const isListItem = (child: React.ReactNode) =>
    getDisplayName(child) === 'ListItem';

  const addRole = (child: React.ReactNode) => {
    if (isListItem(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          ...getListItemRole(),
          ...(React.isValidElement(child) ? (child.props as Object) : {}),
        })
      }

      return child
  }

  return  (
    <ListContext.Provider value={listItemValues}>
      <Tag 
        tag="ul" 
        {...rest} 
        element={rootEl} 
        role={role}
        className={className} 
        ref={ref} 
      >{needsListItemsWrapper 
        ? React.Children.map(children, addRole)
        : children}
      </Tag>
    </ListContext.Provider>
  )
});
