import {
  MDCModalDrawerFoundation,
  MDCDismissibleDrawerFoundation
} from '@material/drawer';
import { DrawerProps } from '.';
import {
  useFoundation,
  FocusTrap,
  focusTrapFactory,
  triggerWindowResize
} from '@rmwc/base';
import React, { useRef, useEffect, useCallback } from 'react';

const useDrawerFoundationFactory = (
  MDCConstructor:
    | typeof MDCModalDrawerFoundation
    | typeof MDCDismissibleDrawerFoundation
) =>
  function useDrawerFoundation(props: DrawerProps & React.HTMLProps<any>) {
    const focusTrapRef = useRef<FocusTrap>();

    const { foundation, ...elements } = useFoundation({
      props,
      elements: {
        rootEl: true,
        scrimEl: true
      },
      foundation: ({ rootEl, emit, getProps }) => {
        let previousFocusEl: HTMLElement;

        const f = new MDCConstructor({
          addClass: (className: string) => rootEl.addClass(className),
          removeClass: (className: string) => rootEl.removeClass(className),
          hasClass: (className: string) => rootEl.hasClass(className),
          elementHasClass: (element: HTMLElement, className: string) =>
            element.classList.contains(className),
          saveFocus: () => {
            previousFocusEl = document.activeElement as HTMLElement;
          },
          restoreFocus: () => {
            if (
              rootEl.ref &&
              rootEl.ref.contains(document.activeElement) &&
              previousFocusEl
            ) {
              previousFocusEl.focus();
            }
          },
          focusActiveNavigationItem: () => {
            const activeNavItemEl = rootEl.ref?.querySelector(
              `.mdc-list-item--activated`
            );
            if (activeNavItemEl) {
              (activeNavItemEl as HTMLElement).focus();
            }
          },
          notifyClose: () => {
            //emit('onClose', {}, true /* shouldBubble */);
          },
          notifyOpen: () => {
            emit('onOpen', {}, true /* shouldBubble */);
          },
          trapFocus: () => {
            try {
              focusTrapRef.current?.trapFocus();
            } catch (err) {}
          },
          releaseFocus: () => {
            try {
              focusTrapRef.current?.releaseFocus();
            } catch (err) {}
          }
        });

        // Fixes a very annoying issue where the menu isn't stateful
        // this allows us to keep the menu open based on its controlled prop.
        const existingClose = f.close.bind(f);
        const newClose = () => {
          emit('onClose', {});

          setTimeout(() => {
            if (!getProps().open) {
              existingClose();
            }
          });
        };
        f.close = newClose;

        return f;
      }
    });

    const { rootEl, scrimEl } = elements;

    useEffect(() => {
      if (rootEl.ref) {
        focusTrapRef.current = focusTrapFactory(rootEl.ref);
      }
    }, [rootEl.ref]);

    useEffect(() => {
      props.open ? foundation.open() : foundation.close();
    }, [props.open, foundation]);

    const handleScrimClick = useCallback(() => {
      (foundation as MDCModalDrawerFoundation).handleScrimClick?.();
    }, [foundation]);

    const { onKeyDown } = props;
    const handleKeyDown = useCallback(
      (evt: React.KeyboardEvent & KeyboardEvent) => {
        onKeyDown?.(evt);
        foundation.handleKeydown(evt);
      },
      [foundation, onKeyDown]
    );

    const { onTransitionEnd } = props;
    const handleTransitionEnd = useCallback(
      (evt: React.TransitionEvent & TransitionEvent) => {
        onTransitionEnd?.(evt);
        foundation.handleTransitionEnd(evt);
        triggerWindowResize();
      },
      [foundation, onTransitionEnd]
    );

    rootEl.setProp('onKeyDown', handleKeyDown, true);
    rootEl.setProp('onTransitionEnd', handleTransitionEnd, true);
    scrimEl.setProp('onClick', handleScrimClick, true);

    return { foundation, ...elements };
  };

//eslint-disable-next-line react-hooks/rules-of-hooks
export const useDismissableDrawerFoundation = useDrawerFoundationFactory(
  MDCDismissibleDrawerFoundation
);

//eslint-disable-next-line react-hooks/rules-of-hooks
export const useModalDrawerFoundation = useDrawerFoundationFactory(
  MDCModalDrawerFoundation
);
