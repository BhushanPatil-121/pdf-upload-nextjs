"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <div style={{
        height:'100vh',
        display:"flex",
        justifyContent:"center",
        alignItems:"centre",
        backgroundColor:"grey"
    }}>
        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '95vw',
        height: '90vh',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : 'red',
      }}
    >
      <Grid container spacing={2} xs={12}>
        <Grid item  xs={6}>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/next.svg" />
          </ButtonBase>
        </Grid>
        <Grid item  xs={3} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}
