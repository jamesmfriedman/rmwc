import React, { useCallback, useRef, useEffect } from 'react';
import { RippleProps } from './';
import { useFoundation, emptyClientRect } from '@rmwc/base';
import { matches } from '@rmwc/base';
import { EventType, SpecificEventListener } from '@material/base/types';

import { MDCRippleFoundation, util } from '@material/ripple';

type ActivateEventTypes<S> =
  | React.MouseEvent<S>
  | React.TouchEvent<S>
  | React.KeyboardEvent<S>
  | React.FocusEvent<S>;

export const useRippleFoundation = (
  props: RippleProps & React.HTMLProps<any> & { domNode?: Element }
) => {
  const isTouched = useRef(false);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      surfaceEl: true
    },
    foundation: ({ rootEl, surfaceEl, getProps }) => {
      return new MDCRippleFoundation({
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => !!getProps().unbounded,
        isSurfaceActive: () => {
          if (rootEl.ref) {
            return matches(rootEl.ref, ':active');
          }
          return false;
        },
        isSurfaceDisabled: () => !!getProps().disabled,
        addClass: (className: string) => {
          surfaceEl.addClass(className);
        },
        removeClass: (className: string) => {
          surfaceEl.removeClass(className);
        },
        containsEventTarget: (target: HTMLElement) =>
          !!rootEl.ref && rootEl.ref.contains(target),
        registerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {},
        deregisterInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {},
        registerDocumentInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void =>
          document.documentElement.addEventListener(evtType, handler, {
            passive: true
          }),
        deregisterDocumentInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => document.documentElement.removeEventListener(evtType, handler),
        registerResizeHandler: (
          handler: SpecificEventListener<'resize'>
        ): void => window.addEventListener('resize', handler),
        deregisterResizeHandler: (
          handler: SpecificEventListener<'resize'>
        ): void => window.removeEventListener('resize', handler),
        updateCssVariable: (varName: string, value: string) =>
          surfaceEl.setStyle(varName, value),
        computeBoundingRect: () =>
          rootEl.ref ? rootEl.ref.getBoundingClientRect() : emptyClientRect,
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        })
      });
    }
  });

  const { rootEl } = elements;

  const activateRipple = useCallback(
    (evt: ActivateEventTypes<HTMLElement> & Event) => {
      // https://reactjs.org/docs/events.html#event-pooling
      evt.persist();
      foundation.activate(evt);
    },
    [foundation]
  );

  const deactivateRipple = useCallback(
    (evt: ActivateEventTypes<HTMLElement>) => {
      // https://reactjs.org/docs/events.html#event-pooling
      evt.persist();
      foundation.deactivate();
    },
    [foundation]
  );

  const { onFocus } = props;
  const handleFocus = useCallback(
    (evt: React.FocusEvent<HTMLElement>) => {
      onFocus?.(evt);
      foundation.handleFocus();
    },
    [foundation, onFocus]
  );

  const { onBlur } = props;
  const handleBlur = useCallback(
    (evt: React.FocusEvent<HTMLElement>) => {
      onBlur?.(evt);
      foundation.handleBlur();
    },
    [foundation, onBlur]
  );

  const { onMouseDown } = props;
  const handleMouseDown = useCallback(
    (evt: React.MouseEvent<HTMLElement> & MouseEvent) => {
      onMouseDown?.(evt);
      if (!isTouched.current) {
        activateRipple(evt);
      }

      isTouched.current = false;
    },
    [onMouseDown, activateRipple]
  );

  const { onMouseUp } = props;
  const handleMouseUp = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      onMouseUp?.(evt);
      deactivateRipple(evt);
    },
    [onMouseUp, deactivateRipple]
  );

  const { onTouchStart } = props;
  const handleTouchStart = useCallback(
    (evt: React.TouchEvent<HTMLElement> & TouchEvent) => {
      isTouched.current = true;
      onTouchStart?.(evt);
      activateRipple(evt);
    },
    [onTouchStart, activateRipple]
  );

  const { onTouchEnd } = props;
  const handleTouchEnd = useCallback(
    (evt: React.TouchEvent<HTMLElement>) => {
      onTouchEnd?.(evt);
      deactivateRipple(evt);
    },
    [onTouchEnd, deactivateRipple]
  );

  const { onKeyDown } = props;
  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLElement> & KeyboardEvent) => {
      onKeyDown?.(evt);
      activateRipple(evt);
    },
    [onKeyDown, activateRipple]
  );

  const { onKeyUp } = props;
  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      onKeyUp?.(evt);
      deactivateRipple(evt);
    },
    [onKeyUp, deactivateRipple]
  );

  rootEl.setProp('onFocus', handleFocus, true);
  rootEl.setProp('onBlur', handleBlur, true);
  rootEl.setProp('onMouseDown', handleMouseDown, true);
  rootEl.setProp('onMouseUp', handleMouseUp, true);
  rootEl.setProp('onTouchStart', handleTouchStart, true);
  rootEl.setProp('onTouchEnd', handleTouchEnd, true);
  rootEl.setProp('onKeyDown', handleKeyDown, true);
  rootEl.setProp('onKeyUp', handleKeyUp, true);

  useEffect(() => {
    rootEl.setRef(props.domNode);
  }, [rootEl, props.domNode]);

  useEffect(() => {
    foundation.setUnbounded(!!props.unbounded);
  }, [props.unbounded, foundation]);

  useEffect(() => {
    props.disabled && foundation.handleBlur();
  }, [props.disabled, foundation]);

  return { ...elements };
};
