import styled from 'styled-components';
import { memo } from 'react';
import { Box, Span } from '../Shared';

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

export const GridRow = styled.div`
  border-collapse: collapse;
  display: grid;
  grid-template-columns: repeat(65, 1fr);
  width: 100vw;
`;

export const Button = styled.button`
  padding: 1rem;
  margin: 0 0.5rem;
  border-radius: 8px;
  font-family: 'Source Code Pro', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  background: #cbd5e0;
  color: #2d3748;
  border: none;
`;

export const NodeWrapper = styled('div')`
  position: relative;
  width: auto;
  height: 2rem;
  /* outline: 0.02rem solid gray; */

  text-align: center;
  vertical-align: middle;
  line-height: 2rem;

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
    text-decoration: underline #ecc94b;
  }
`;

export const Statistic = styled(Span)`
  white-space: nowrap;
  color: white;
  span:nth-of-type(1) {
    color: #ecc94b;
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
