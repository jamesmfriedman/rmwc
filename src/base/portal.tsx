import React, { useRef, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

const PORTAL_ID = 'rmwcPortal';

export type PortalPropT = Element | string | boolean | undefined | null;

export function Portal() {
  const el = useRef(document.createElement('div'));

  return <div ref={el} id={PORTAL_ID} />;
}

export function PortalChild({
  children,
  renderTo
}: {
  children: React.ReactNode;
  renderTo?: PortalPropT;
}) {
  const portalEl: Element | undefined = useMemo(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    let element: Element | undefined = undefined;

    if (renderTo === true) {
      element = document.getElementById(PORTAL_ID) || undefined;

      !element &&
        console.warn(
          'No default Portal found. Did you forget to include it in the root of your app? `import { Portal } from "@rmwc/base";`'
        );
    } else if (typeof renderTo === 'string') {
      element = document.querySelector(renderTo) || undefined;

      !element &&
        console.warn(
          `The selector you provided for renderToPortal "${renderTo}" didn't find any elements.`
        );
    } else if (renderTo instanceof Element) {
      element = renderTo;
    }

    return element;
  }, [renderTo]);

  if (portalEl) {
    return ReactDOM.createPortal(children, portalEl);
  }

  return <>{children}</>;
}
