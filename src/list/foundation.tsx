import { useEffect, useCallback, useState } from 'react';
import { MDCListFoundation, MDCListAdapter } from '@material/list';
import { matches, FoundationElement } from '@rmwc/base';
import { useFoundation } from '@rmwc/base';
import { ListProps, ListApi } from './list';

interface ListItemClassesState  { [index: number]: string[] };

export const useListFoundation = (props: ListProps & React.HTMLProps<any>) => {
  const listElements = useCallback((el: Element | null): HTMLLIElement[] => {
    if (el) {
      return [].slice.call(
        el.querySelectorAll(`.${MDCListFoundation.cssClasses.LIST_ITEM_CLASS}`)
      );
    }
    return [];
  }, []);

  const [ listItemClasses, setListItemClasses ] =
    useState<ListItemClassesState>({});
  const [ role,setRole ] = useState<string|undefined>(undefined)

  const { foundation, ...elements } = useFoundation({
    props,
    api: ({
      rootEl,
      foundation
    }: {
      rootEl: FoundationElement<any, any>;
      foundation: MDCListFoundation;
    }): ListApi => {
      const adapter = (foundation as any).adapter_ as MDCListAdapter;
      return {
        listElements: () => listElements(rootEl.ref),
        focusRoot: () => rootEl.ref && rootEl.ref.focus(),
        getClasses: () => MDCListFoundation.cssClasses.LIST_ITEM_CLASS,
        addClassToElementIndex: adapter.addClassForElementIndex,
        removeClassFromElementAtIndex: adapter.removeClassForElementIndex,
        setAttributeForElementIndex: adapter.setAttributeForElementIndex,
        getListItemCount: adapter.getListItemCount,
        focusItemAtIndex: adapter.focusItemAtIndex
      };
    },
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCListFoundation({
        getListItemCount: () => listElements(rootEl.ref).length,
        getFocusedElementIndex: () =>
          listElements(rootEl.ref).indexOf(
            document.activeElement as HTMLLIElement
          ),
        listItemAtIndexHasClass: (index: number, className: string) => {
          const element = listElements(rootEl.ref)[index];
          return !!element?.classList.contains(className);
        },
        setAttributeForElementIndex: (
          index: number,
          attr: string,
          value: string | number
        ) => {
          // This value is getting set and never getting set back
          // This is causing list items to be un-tabbable
          // if (attr === 'tabindex' && value === -1) {
          //   return;
          // }

          if (attr === 'tabindex') {
            attr = 'tabIndex';
          }
          const element = listElements(rootEl.ref)[index];
          if (element) {
            element.setAttribute(attr, String(value));
          }
        },
        addClassForElementIndex: (index: number, className: string) => {
          setListItemClasses((listItems: ListItemClassesState) => {
            if (listItems[index] && listItems[index].indexOf(className) > -1) {
              // no dupes
              return listItems
            }

            if ( listItems[index] 
              && listItems[index].indexOf(className) === -1) {
              return  {...listItems, [index]: [...listItems[index],className]}
            } 

            return {...listItems, [index]: [className]}
          });
        },
        removeClassForElementIndex: (index: number, className: string) => {
          setListItemClasses((listItems: ListItemClassesState) => {
            if (listItems[index] && listItems[index].indexOf(className) > -1) {
              return {
                ...listItems, 
                [index]: listItems[index].filter((name) => name !== className) 
              }
            }

            return listItems
          })
        },
        focusItemAtIndex: (index: number) => {
          const element = listElements(rootEl.ref)[index];
          if (element) {
            element.focus();
          }
        },
        setTabIndexForListItemChildren: (
          listItemIndex: number,
          tabIndexValue: string | number
        ) => {
          const element = listElements(rootEl.ref)[listItemIndex];
          const listItemChildren: Element[] = [].slice.call(
            element.querySelectorAll(
              MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX
            )
          );
          listItemChildren.forEach((ele) =>
            ele.setAttribute('tabindex', String(tabIndexValue))
          );
        },
        hasCheckboxAtIndex: (index: number) => {
          const listItem = listElements(rootEl.ref)[index];
          return !!listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_SELECTOR
          );
        },
        hasRadioAtIndex: (index: number) => {
          const listItem = listElements(rootEl.ref)[index];
          return !!listItem.querySelector(
            MDCListFoundation.strings.RADIO_SELECTOR
          );
        },
        isCheckboxCheckedAtIndex: (index: number) => {
          const listItem = listElements(rootEl.ref)[index];
          const toggleEl = listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_SELECTOR
          ) as HTMLInputElement | null;

          return toggleEl ? toggleEl.checked : false;
        },
        setCheckedCheckboxOrRadioAtIndex: (
          index: number,
          isChecked: boolean
        ) => {
          const listItem = listElements(rootEl.ref)[index];
          const toggleEl = listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR
          ) as HTMLInputElement | null;

          if (toggleEl) {
            toggleEl.checked = isChecked;

            const event = document.createEvent('Event');
            event.initEvent('change', true, true);
            toggleEl.dispatchEvent(event);
          }
        },
        notifyAction: (index: number) => {
          emit('onAction', { index });
        },
        isFocusInsideList: () => {
          return !!rootEl.ref?.contains(document.activeElement);
        },
        isRootFocused: () => document.activeElement === rootEl.ref
      });
    }
  });

  const { rootEl } = elements;

  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */
  const getListItemIndex = useCallback(
    (evt: React.FocusEvent | React.KeyboardEvent | React.MouseEvent) => {
      let eventTarget = evt.target as HTMLElement | null;
      let index = -1;

      // Find the first ancestor that is a list item or the list.
      while (
        eventTarget &&
        !eventTarget.classList.contains(
          MDCListFoundation.cssClasses.LIST_ITEM_CLASS
        ) &&
        !eventTarget.classList.contains(MDCListFoundation.cssClasses.ROOT)
      ) {
        eventTarget = eventTarget.parentElement as HTMLLIElement;
      }

      // Get the index of the element if it is a list item.
      if (
        eventTarget &&
        eventTarget.classList.contains(
          MDCListFoundation.cssClasses.LIST_ITEM_CLASS
        )
      ) {
        index = listElements(rootEl.ref).indexOf(eventTarget as HTMLLIElement);
      }

      return index;
    },
    [listElements, rootEl.ref]
  );

  const handleClick = useCallback(
    (evt: React.MouseEvent) => {
      props.onClick?.(evt);

      const index = getListItemIndex(evt);

      // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
      const toggleCheckbox = !matches(
        evt.target as HTMLElement,
        MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR
      );

      foundation.handleClick(index, toggleCheckbox);
    },
    [getListItemIndex, foundation, props.onClick]
  );

  const handleKeydown = useCallback(
    (evt: React.KeyboardEvent<HTMLElement> & KeyboardEvent) => {
      props.onKeyDown?.(evt);

      const index = getListItemIndex(evt);

      if (index >= 0) {
        foundation.handleKeydown(
          evt,
          evt.target instanceof Element &&
            evt.target.classList.contains(
              MDCListFoundation.cssClasses.LIST_ITEM_CLASS
            ),
          index
        );
      }
    },
    [getListItemIndex, foundation, props.onKeyDown]
  );

  const handleFocusIn = useCallback(
    (evt: React.FocusEvent & FocusEvent) => {
      props.onFocus?.(evt);
      foundation.handleFocusIn(evt, getListItemIndex(evt));
    },
    [getListItemIndex, foundation, props.onFocus]
  );

  const handleFocusOut = useCallback(
    (evt: React.FocusEvent & FocusEvent) => {
      props.onBlur?.(evt);
      foundation.handleFocusOut(evt, getListItemIndex(evt));
    },
    [getListItemIndex, foundation, props.onBlur]
  );

  rootEl.setProp('onClick', handleClick, true);
  rootEl.setProp('onKeyDown', handleKeydown, true);
  rootEl.setProp('onFocus', handleFocusIn, true);
  rootEl.setProp('onBlur', handleFocusOut, true);
  
  const initializeListRole = useCallback((): void=>  {
      // regular list implicitly has role='list' and is not necessary to set
      // checkbox list should be role='group'
      // radio list should be role='radiogroup'
      // else, role='listbox' if selectedIndex

    if (props.role) { return setRole(props.role);  }
    
    if (!rootEl.ref) { return; }

    const hasSelectedIndex_: boolean  = !!props.selectedIndex || 
      !!rootEl.ref.querySelector(`
        .${MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS},
        .${MDCListFoundation.cssClasses.LIST_ITEM_SELECTED_CLASS}
      `);

    const isCheckboxList_: boolean =  !!rootEl.ref.querySelector(
      MDCListFoundation.strings.CHECKBOX_SELECTOR
    );
    const isRadioList_ : boolean = !!rootEl.ref.querySelector(
      MDCListFoundation.strings.RADIO_SELECTOR
    );

    if (isCheckboxList_) {
      return setRole('group');
    }
    if (isRadioList_) {
      return setRole('radiogroup')
    }

    if (hasSelectedIndex_) {
      return setRole('listbox');
    }
  },[props.role, props.selectedIndex, rootEl.ref])

  // layout on mount
  useEffect(() => {
    foundation.layout();
    initializeListRole()
  }, [foundation, initializeListRole]);

  useEffect(() => {
    foundation.setWrapFocus(props.wrapFocus || props.wrapFocus === undefined);
  }, [foundation, props.wrapFocus]);

  useEffect(() => {
    foundation.setVerticalOrientation(
      props.vertical || props.vertical === undefined
    );
  }, [foundation, props.vertical]);

  useEffect(() => {
    if (props.selectedIndex !== undefined && props.selectedIndex > -1) { 
      foundation.setSelectedIndex(props.selectedIndex)
    }
  }, [foundation, props.selectedIndex]);


  useEffect((): void =>  {
    if (role) {
      foundation.setSingleSelection(role === 'listbox')
    }
  }, [foundation, role])

  const setEnabled = (index: number, isEnabled: boolean) => {
    foundation.setEnabled(index,isEnabled);
  }



  return { ...elements, listItemClasses, setEnabled, role};
};
