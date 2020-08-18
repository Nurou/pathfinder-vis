import React from 'react';
import { Box } from '../Shared';

export const ControlPanel = ({ children }: any): JSX.Element => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" bg="white" width="100%" p={5}>
      {children}
    </Box>
  );
};

export default ControlPanel;
