import React from 'react';

export const ControlPanel = ({ children, ...rest }: any): JSX.Element => {
  return <div {...rest}>{children}</div>;
};

export default ControlPanel;
