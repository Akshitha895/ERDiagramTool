import React, { useState } from 'react';
import { Container } from '@mui/system';
import DiagramBuilder from '../diagramBuilder';
import TablesList from '../tablesList';
import { Grid } from '@mui/material';

export default function ErTool() {
  const [currDragItem, setCurrDragItem] = useState<any>({});
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        padding: '0 !important',
      }}
    >
      <Grid container>
        <TablesList afterDragStart={(val) => setCurrDragItem(val)} />
        <DiagramBuilder currDragItem={currDragItem} />
      </Grid>
    </Container>
  );
}
