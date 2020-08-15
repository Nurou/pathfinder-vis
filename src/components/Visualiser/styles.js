import styled from 'styled-components';
import { memo } from 'react';
import { Box } from '../Shared';

export const Grid = memo(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-collapse: collapse;
  border: 0.3rem hsl(55, 30%, 80%) solid;
`);

export const GridRow = styled.div`
  display: flex;
  border-collapse: collapse;
  line-height: 0;
`;

export const Button = styled.button`
  padding: 0.4rem;
  margin: 0 0.5rem;
  font-family: 'Work Sans', sans-serif;
  background: #ebf8ff;
  color: #2a4365;
  border: none;
`;

export const NodeWrapper = styled('div')`
  position: relative;
  width: 2.5vmin;
  height: 2.5vmin;
  /* outline: 0.02rem solid gray; */
  border-collapse: collapse;

  background: ${({ variant }) =>
    variant === 'start' ? 'black' : variant === 'end' ? 'red' : null};

  /* center text */
  text-align: center;
  vertical-align: middle;
  line-height: 2vmin;

  span {
    position: absolute;
    top: 50%;
  }
`;

export const StatsWrapper = styled(Box)`
  background-color: rgba(0, 0, 0, 0.7);

  h1,
  h2,
  h3,
  span {
    color: white;
  }
`;
