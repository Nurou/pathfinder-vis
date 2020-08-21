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
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  width: 100vw;
`;

export const Button = styled.button`
  padding: ${(props) => (props.main ? '1.5rem' : '1rem')};
  margin: 0 0.5rem;
  font-family: 'Source Code Pro', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  background: ${(props) => (props.main ? '#F56565' : '#cbd5e0')};
  color: ${(props) => (props.main ? 'white' : '#2d3748')};
  border: ${(props) => (props.main ? '3px solid #9B2C2C' : 'none')};
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
