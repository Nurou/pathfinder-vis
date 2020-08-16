import styled from 'styled-components';
import { memo } from 'react';
import { Box, Span } from '../Shared';

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
  font-family: 'Orbitron', sans-serif;
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
  h1,
  h2,
  h3 {
    color: white;
  }

  h2 {
    text-decoration: underline gold;
  }
`;

export const Statistic = styled(Span)`
  white-space: nowrap;
  color: white;
  span:nth-of-type(1) {
    color: gold;
  }
`;

export const AlgoInfo = styled(Box)`
  strong {
    font-weight: bold;
    color: #888888;
    text-shadow: 1px 0 #888888;
    letter-spacing: 1px;
  }
`;
