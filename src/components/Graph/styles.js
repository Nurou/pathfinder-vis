import styled from 'styled-components';
import { memo } from 'react';
import { Box } from '../Shared';

export const Grid = memo(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-collapse: collapse;
  border-top: 0.3rem hsl(55, 30%, 80%) solid;
  border-bottom: 0.3rem hsl(55, 30%, 80%) solid;
`);

export const GridRow = memo(styled.tr`
  border-collapse: collapse;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  width: 100vw;
`);
