// import { JsPlumbDefaults } from '@jsplumb/core';
import {
  BrowserJsPlumbDefaults,
  BrowserJsPlumbInstance,
  newInstance,
} from '@jsplumb/browser-ui';

export const defaultOptions: BrowserJsPlumbDefaults = {
  // default drag options
  elementsDraggable: true,
  dragOptions: {
    cursor: 'move',
    zIndex: 2000,
    // containment: 'parentEnclosed',
    // containmentPadding: 10,
  },
  // the overlays to decorate each connection with.
  // connectionOverlays: [
  //   [
  //     'Arrow',
  //     {
  //       location: 1,
  //       visible: true,
  //       width: 11,
  //       length: 11,
  //       id: 'ARROW',
  //     },
  //   ],
  // ],
};

// const connectorPaintStyle: PaintStyle = {
//   strokeWidth: 2,
//   stroke: '#61B7CF',
//   //outlineStroke: "#61B7CF",
//   //outlineWidth: 2,
// };

// const connectorHoverStyle: PaintStyle = {
//   strokeWidth: 3,
//   stroke: '#216477',
//   //outlineWidth: 5,
//   //outlineStroke: "#216477",
// };

// const endpointHoverStyle: PaintStyle = {
//   fill: '#216477',
//   stroke: '#216477',
// };

// export const sourceEndpoint: EndpointOptions = {
//   endpoint: 'Dot',
//   paintStyle: {
//     stroke: '#16A085',
//     fill: 'transparent',
//     strokeWidth: 1,
//   },
//   isSource: true,
//   //   connector: [
//   //     'Bezier',
//   //     {
//   //       curviness: 50,
//   //     },
//   //   ],
//   connectorStyle: connectorPaintStyle,
//   hoverPaintStyle: endpointHoverStyle,
//   connectorHoverStyle: connectorHoverStyle,
//   //   dragOptions: {},
//   maxConnections: -1,
// };

// export const targetEndpoint: EndpointOptions = {
//   endpoint: 'Dot',
//   paintStyle: {
//     fill: '#E74C3C',
//   },
//   hoverPaintStyle: endpointHoverStyle,
//   maxConnections: -1,
//   //   dropOptions: { hoverClass: 'hover', activeClass: 'active' },
//   isTarget: true,
// };

// export const inputAnchors: AnchorId[] = ['TopLeft', 'BottomLeft', 'Left'];
// export const outputAnchors: AnchorId[] = ['TopRight', 'BottomRight', 'Right'];
