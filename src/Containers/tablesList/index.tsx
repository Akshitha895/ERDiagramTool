import React from 'react';
import { Grid, Paper, Stack } from '@mui/material';
import { Box, styled } from '@mui/system';

const StackItem = styled(Paper)(() => ({
  height: '30px',
  padding: '5px 0 ',
  border: '1px solid black',
}));

interface ITablesList {
  afterDragStart(val: any): void;
}

export default function TablesList({ afterDragStart }: ITablesList) {
  const data = [
    {
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

  const onDragStart = (e: any, index: number) => {
    const styledTableDiv = {
      ...data[index],
      style: {
        left: e.clientX,
        top: e.clientY,
      },
    };
    afterDragStart(styledTableDiv);
    const tableEle = document.getElementById('draggable' + data[index].table);
    if (tableEle) {
      tableEle.draggable = false;
      tableEle.style.cursor = 'not-allowed';
      tableEle.style.background = '#cecece';
    }
  };

  return (
    <Grid item xs={2} sx={{ background: '#e0e0e0' }}>
      {/* list of tables on left column  */}
      <Stack
        id='draggable-items'
        spacing={2}
        sx={{
          padding: '10px',
          textAlign: 'center',
          cursor: 'grab',
          textTransform: 'capitalize',
        }}
      >
        {data.map((item, index) => (
          <StackItem
            id={'draggable' + item.table}
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
          >
            {item.table}
          </StackItem>
        ))}
      </Stack>
    </Grid>
  );
}
