import React from 'react';
import Box from '@mui/material/Box';
import {CircularProgress} from '@mui/material';

export const CircularProgressCustom =()=>{
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
      <CircularProgress />
    </Box>
  );
};
