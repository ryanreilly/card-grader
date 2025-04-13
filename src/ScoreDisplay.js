import React from 'react';
import { Typography, Grid } from '@mui/material';

const ScoreDisplay = ({ scores }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h6">Scores</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Centering: {scores.centering}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Corners: {scores.corners}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Edges: {scores.edges}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Surface: {scores.surface}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Overall Score: {scores.overall}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ScoreDisplay;