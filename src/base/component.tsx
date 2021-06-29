import * as RMWC from '@rmwc/types';
import React from 'react';
import classNamesFunc from 'classnames';
import { parseThemeOptions } from './with-theme';
import { FoundationElement } from './foundation-component';

type ClassNamesInputT<Props> =
  | undefined
  | ((
      props: Props
    ) => Array<
      | string
      | undefined
      | null
      | { [className: string]: boolean | undefined | string | number }
    >)
  | string[]
  | Array<
      | string
      | undefined
      | null
      | { [className: string]: boolean | undefined | string | number }
    >;

export const Tag = React.forwardRef<
  any,
  {
    element?: FoundationElement<any, any>;
  } & RMWC.HTMLProps<any, any>
>(function Tag({ tag: TagEl = 'div', theme, element, ...rest }, ref) {
  const finalProps = element ? element.props(rest) : rest;
  const finalRef = element ? mergeRefs(ref, element.setRef) : ref;

  return <TagEl {...finalProps} ref={finalRef} />;
});

export const useClassNames = <Props extends { [key: string]: any }>(
  props: Props,
  classNames: ClassNamesInputT<Props>
) => {
  return classNamesFunc(
    props.className,
    ...(!!props.theme ? parseThemeOptions(props.theme) : []),
    // @ts-ignore
    ...(typeof classNames === 'function' ? classNames(props) : classNames)
  );
};

export const mergeRefs =
  (...refs: Array<React.Ref<any> | undefined | null>) =>
  (el: any) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref && 'current' in ref) {
        // @ts-ignore
        ref.current = el;
      }
    }
  };

export const handleRef = <T extends any>(
  ref: React.Ref<T> | null | undefined,
  value: T
) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref && 'current' in ref) {
    // @ts-ignore
    ref.current = value;
  }
};

export function createComponent<
  P extends {},
  ElementP extends {} = React.HTMLProps<HTMLElement>
>(Component: React.RefForwardingComponent<any, P & ElementP>) {
  const ForwardComponent = React.forwardRef<
    any,
    RMWC.ComponentProps<P, ElementP, any>
  >(Component);

  // Interestingly enough, we only need this declaration
  // for a generic placeholder for typescript inference,
  // we don't actually have to pay the penalty for using it at runtime :)
  const WrappedComponent = <Tag extends React.ElementType = 'div'>(
    props: RMWC.ComponentProps<P, ElementP, Tag>,
    ref: any
  ) => {
    return <></>;
  };

  WrappedComponent.displayName = Component.constructor.name || 'RMWCComponent';
  ForwardComponent.displayName = WrappedComponent.displayName;

  return ForwardComponent as typeof WrappedComponent;
}

export function createMemoComponent<
  P extends {},
  ElementP extends {} = React.HTMLProps<HTMLDivElement>
>(Component: React.RefForwardingComponent<any, P & ElementP>) {
  const Comp = createComponent<P, ElementP>(Component);
  return React.memo(Comp) as typeof Comp;
}
