import React, { Fragment, useEffect, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import { useJsPlumb } from 'Contexts/jsPlumb';
import { FlowchartConnector } from '@jsplumb/connector-flowchart';
import { EVENT_CONNECTION_CLICK } from '@jsplumb/browser-ui';
import { OverlayOptions } from 'jsplumb';
import SvgIconDialog from './svgIconDialog';

interface IDiagramBuilder {
  currDragItem: any;
}

const svgStrings = {
  circle:
    '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="25px"  viewBox="0 0 10 10" version="1.1" ><g id="surface1" ><circle cx="5" cy="5" r="5" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#E74C3C" stroke="none"></circle></g></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="25px"  viewBox="0 0 10 10" version="1.1" ><g id="surface1" ><path d="M 0 5 H 5 V0 V10 V5 H10" fill="none" stroke="black" width="1" /></g></svg>',
};

export default function DiagramBuilder({ currDragItem }: IDiagramBuilder) {
  const [containerEle, setContainerEle] = useState<HTMLElement | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedConnection, setSelectedConnection] = useState<any>();
  const [selectedConnectionOverlays, setSelectedConnectionOverlays] = useState<
    OverlayOptions[]
  >([]);
  const [svgIcons, setSetSvgIcons] = useState<any>({ source: '', target: '' });
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState([]);

  const { instance } = useJsPlumb(containerEle);

  useEffect(() => {
    const ele = document.getElementById('droppable-container') ?? undefined;
    if (ele) setContainerEle(ele);
  }, []);

  useEffect(() => {
    if (instance && instance.bind) {
      instance.bind(EVENT_CONNECTION_CLICK, (connection, e) => {
        setIsModalOpen(true);
        setSelectedConnection(connection);
      });
    }
  }, [instance]);

  const updateConnetionOverlays = () => {
    if (selectedConnectionOverlays.length && selectedConnection) {
      selectedConnectionOverlays.forEach((connOverlay: OverlayOptions) => {
        selectedConnection?.addOverlay(connOverlay);
      });
      const connEle = document.getElementById(selectedConnection.sourceId);
      connEle && instance.revalidate(connEle);
      setSelectedConnection(undefined);
      setSelectedConnectionOverlays([]);
    }
  };

  useEffect(() => {
    setSelectedConnectionOverlays(getConnectionOverlays());
  }, [svgIcons]);

  const getDroppedDiv = (nodeData: any, key: number) => {
    return (
      <div
        style={{ ...nodeData.style }}
        className='table'
        key={key}
        id={nodeData.table + '-' + 'table'}
      >
        {/* Heading */}
        <div className='table-header'>{nodeData.table}</div>
        {/* Columns */}
        {nodeData?.columns.map((col: any, index: number) => (
          <Fragment key={index}>
            <div id={nodeData.table + '-' + col.id} className='table-column'>
              {col.name}
            </div>
            {index < nodeData.columns.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    );
  };

  const getConnectionOverlays = (): Array<OverlayOptions> => {
    return [
      ...(svgIcons.source && [
        {
          type: 'Custom',
          options: {
            create: (component) => {
              const d = document.createElement('div');
              d.innerHTML = svgStrings[svgIcons.source];
              return d;
            },
            location: 0.1,
            id: 'customOverlaySource',
          },
        },
      ]),
      ...(svgIcons.target && [
        {
          type: 'Custom',
          options: {
            create: (component) => {
              const d = document.createElement('div');
              d.innerHTML = svgStrings[svgIcons.target];
              return d;
            },
            location: 0.9,
            id: 'customOverlayTarget',
          },
        },
      ]),
    ];
  };

  const onDrop = (ev: any) => {
    // caluclate style for placement of table on the first drop
    currDragItem.style.left = ev.clientX - currDragItem.style.left;
    currDragItem.style.top = ev.clientY - currDragItem.style.top;
    setNodes([...nodes, currDragItem]);

    setTimeout(() => {
      currDragItem.columns.forEach((col: any) =>
        addEndpoint(
          `${currDragItem.table}-${col.id}`,
          `${currDragItem.table}-table`
        )
      );
    }, 1);
  };

  const addEndpoint = (colId: string, tableId: string) => {
    const colEle = document.getElementById(colId);
    const tableEle = document.getElementById(tableId);

    instance.manage(tableEle!);
    instance.addEndpoint(colEle!, {
      endpoint: 'Dot',
      anchor: ['Right'],
      source: true,
      paintStyle: {
        fill: '#E74C3C',
      },
      connector: {
        type: FlowchartConnector.type,
        options: {
          cornerRadius: 5,
        },
      },
      maxConnections: 1,
    });
    instance.addEndpoint(colEle!, {
      endpoint: 'Rectangle',
      anchor: ['Left'],
      target: true,
    });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    updateConnetionOverlays();
  };

  return (
    /* Droppable container on right panel */
    <Grid item xs={10}>
      <div
        style={{ position: 'relative', height: '100%', width: '100%' }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e)}
        id='droppable-container'
      >
        {nodes.map((v, i) => getDroppedDiv(v, i))}
      </div>
      <SvgIconDialog
        isOpen={isModalOpen}
        onModalClose={onModalClose}
        onDropdownChange={(key: string, value: string) => {
          setSetSvgIcons({ ...svgIcons, [key]: value });
        }}
      />
    </Grid>
  );
}
