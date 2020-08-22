import React from 'react';
import { Box } from './Shared';

export const ControlPanel = ({ children, ...rest }: any): JSX.Element => {
  return <Box {...rest}>{children}</Box>;
};

export default ControlPanel;
