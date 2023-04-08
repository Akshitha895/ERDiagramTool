import React, { useEffect } from 'react';
import {
  BrowserJsPlumbInstance,
  ContainmentType,
  newInstance,
} from '@jsplumb/browser-ui';

export const useJsPlumb = (containerEle: HTMLElement | undefined) => {
  const [instance, setInstance] = React.useState<BrowserJsPlumbInstance>(
    {} as any
  );

  useEffect(() => {
    let jsPlumbInstance: BrowserJsPlumbInstance;
    if (containerEle) {
      jsPlumbInstance = newInstance({
        elementsDraggable: true,
        dragOptions: {
          cursor: 'move',
          zIndex: 2000,
          containment: ContainmentType.parentEnclosed,
        },
        connectionOverlays: [],
        container: containerEle,
      });
      setInstance(jsPlumbInstance);
    }
    return () => {
      jsPlumbInstance?.destroy();
    };
  }, [containerEle]);

  return { instance, setInstance };
};
