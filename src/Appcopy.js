import { newInstance } from '@jsplumb/browser-ui';
import { useEffect, useRef, useState } from 'react';
import '@jsplumb/browser-ui/css/jsplumbtoolkit.css';
import { FlowchartConnector } from '@jsplumb/connector-flowchart';
import { ReactComponent as Plus } from './Assets/Plus.svg';
// import { ReactComponent as RightArrow } from './assets/RightArrow.svg';
// import { ReactComponent as EqualsTo } from './assets/EqualsTo.svg';

function App() {
  const data = [
    {
      id: 'student-table',
      table: 'student',
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'string',
        },
        {
          id: 'standard',
          name: 'Standard',
          type: 'string',
        },
        {
          id: 'name',
          name: 'Name',
          type: 'string',
        },
      ],
    },
    {
      id: 'teacher-table',
      table: 'teacher',
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'string',
        },
        {
          id: 'standard',
          name: 'Standard',
          type: 'string',
        },
        {
          id: 'name',
          name: 'Name',
          type: 'string',
        },
      ],
    },
    {
      id: 'college-table',
      table: 'college',
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'string',
        },
        {
          id: 'name',
          name: 'Name',
          type: 'string',
        },
      ],
    },
  ];

  const [instance, setInstance] = useState();

  const [nodes, setNode] = useState([]);
  const [edges, setEdges] = useState([
    { start: 'student-id', end: 'teacher-name' },
    // { start: 'student-name', end: 'teacher-standard' },
    // { start: 'college-name', end: 'teacher-id' },
  ]);

  useEffect(() => {
    let jsPlumbInstance = newInstance({
      // ...defaultOptions,
      elementsDraggable: true,
      dragOptions: {
        cursor: 'move',
        containment: 'parentEnclosed',
        containmentPadding: 10,
        // drag: (params) => {
        //   console.log('params', params);
        // },
      },
      // container: document.getElementById('droppable-container'),
    });

    setInstance(jsPlumbInstance);
    instance.setContainer(document.getElementById('droppable-container'));
    console.log('jsPlumn', jsPlumbInstance);
  }, []);

  const updateXarrow = useXarrow();

  const dragItem = useRef();

  const onDragStart = (e, index) => {
    // console.log(e, e.clientX, e.target.getBoundingClientRect().left);
    dragItem.current = {
      ...data[index],
      style: {
        left: e.clientX,
        top: e.clientY,
        position: 'absolute',
        border: '1px solid black',
      },
    };
    e.dataTransfer.setData('table', e.target.id);
    document.getElementById('draggable' + data[index].table).draggable = false;
    document.getElementById('draggable' + data[index].table).style.userSelect =
      'none';
  };

  const onNodeDragStart = (e, data) => {
    // console.log(e.clientX, data.style.left);
    data = {
      ...data,
      style: {
        ...data.style,
        left: (e.clientX - data.style.left) / 2,
        top: e.clientY - data.style.top,
      },
    };
    // console.log(data.style);
    dragItem.current = data;
  };

  const getDroppedDiv = (nodeData, i) => {
    return (
      <div
        style={{
          width: '250px',
          margin: '5px 0 ',
          padding: '',
          border: '1px solid black',
          ...nodeData.style,
          position: 'absolute',
        }}
        className='table'
        id={nodeData.table + '-' + 'table'}
        key={i}
      >
        {/* Heading */}
        <div
          style={{
            padding: '5px 0',
            background: 'grey',
          }}
          // draggable
          // onDragStart={(e) => onNodeDragStart(e, nodeData)}
        >
          {nodeData.table}
        </div>
        {/* Columns */}
        {nodeData?.columns.map((col, i) => (
          <div
            key={i}
            id={nodeData.table + '-' + col.id}
            className='column noselect'
          >
            {col.name}
            <div
              className='anchor source'
              onClick={(e) => {
                e.stopPropagation();
                console.log('e', 'source');
              }}
            />
            <div
              className={`anchor target a${i}`}
              onClick={(e) => {
                e.stopPropagation();
                e.target.style.background = 'green';
                console.log('e', 'target  ');
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  const addEndpoint = (id) => {
    const endPointParentEle = document.getElementById(id);
    instance.registerConnectionTypes({
      blueConnection: {
        paintStyle: { stroke: 'blue' },
      },
      redConnection: {
        paintStyle: { stroke: 'red' },
      },
    });
    instance.manage(document.getElementById(dragItem.current.id));

    instance.addEndpoint(endPointParentEle, {
      endPoint: 'Dot',
      anchor: ['Right'],
      source: true,
      paintStyle: {
        fill: '#E74C3C',
      },
      connector: {
        type: FlowchartConnector.type,
        cornerRadius: 5,
      },
      // maxConnections: 1,
      // connectionType: 'blueConnection',
    });

    instance.addEndpoint(endPointParentEle, {
      endPoint: 'Rectangle',
      anchor: ['Left'],
      target: true,
      // paintStyle: {
      //   fill: '#E74C3C',
      // },
      // maxConnections: 2,
      // connectionType: 'redConnection',
    });
  };

  const onDrop = (ev) => {
    // console.log(ev.clientX);
    // var data = ev.dataTransfer.getData('table');
    // ev.target.appendChild(document.getElementById(data));
    const currItemIndex = nodes.findIndex(
      (item) => item.table === dragItem.current.table
    );
    let currItem = dragItem.current;
    const tableDiv = getDroppedDiv(currItem);
    // document.getElementById('droppable-container')

    if (currItemIndex !== -1) {
      const copyOfVertex = JSON.parse(JSON.stringify(nodes));
      const droppableContainerRect = document
        .getElementById('droppable-container')
        .getBoundingClientRect();
      const currItemLeft = ev.clientX - currItem.style.left;
      const currItemTop = ev.clientY - currItem.style.top;

      if (
        currItemLeft > droppableContainerRect.left &&
        currItemLeft < window.screen.width
      )
        currItem.style.left = currItemLeft;
      else currItem.style.left = copyOfVertex[currItemIndex].style.left;

      if (
        currItemTop > droppableContainerRect.top &&
        currItemTop < droppableContainerRect.bottom
      )
        currItem.style.top = currItemTop;
      else currItem.style.top = copyOfVertex[currItemIndex].style.top;

      copyOfVertex[currItemIndex] = currItem;
      setNode(copyOfVertex);

      // instance.repaintEverything();
    } else {
      currItem.style.left = ev.clientX - currItem.style.left;
      currItem.style.top = ev.clientY - currItem.style.top;
      // currItem = { ...currItem, ref: useRef(null) };
      setNode([...nodes, currItem]);
      setTimeout(() => {
        currItem.columns.forEach((col) =>
          addEndpoint(`${currItem.table}-${col.id}`)
        );
      }, 10);
    }
  };

  useEffect(() => {
    updateXarrow();
  }, [nodes, edges]);

  // const addEndpoint = (id) => {
  //   const ele = document.getElementById(id);
  //   const circle = document.createElement('div');
  //   if (ele) {
  //     const left = ele.offsetWidth,
  //       top = Math.round(ele.height);
  //     console.log('left', left, 'top', top);
  //     circle.style.left = left - 5 + 'px';
  //     circle.style.top = top + 'px';
  //     circle.style.borderRadius = '50%';
  //     circle.setAttribute('class', 'endPoint');
  //     ele.appendChild(circle);
  //   }
  // };

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* list of tables on left column  */}
      <div
        style={{ width: '30%', background: 'lightGrey' }}
        id='draggable-items'
      >
        {data.map((item, index) => (
          <div
            id={'draggable' + item.table}
            style={{
              height: '40px',
              margin: '5px 0 ',
              padding: '',
              border: '1px solid black',
            }}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
          >
            {item.table}
          </div>
        ))}
      </div>
      <div />
      {/* Droppable container on right panel */}
      <div
        style={{ width: '70%', position: 'relative' }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e)}
        id='droppable-container'
      >
        {/* <div
          id='canvas'
          style={{
            height: 40,
            width: 40,
            border: '1px solid black',
            margin: '20px',
          }}
        /> */}
        {/* dropped items */}
        {nodes.map((v, i) => getDroppedDiv(v, i))}
        {/* <Xwrapper>
            {nodes.map((v, i) => getDroppedDiv(v, i))}
            connectors
            {nodes.length > 1 &&
              edges?.map((edge) => (
                <Xarrow
                  start={edge.start}
                  end={edge.end}
                  headShape={{ svgElem: <Plus />, offsetForward: 1 }}
                  tailShape={{ svgElem: <Plus />, offsetForward: 1 }}
                  showHead
                  showTail
                  lineColor='lightgrey'
                  path='grid'
                />
              ))}
          </Xwrapper> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
