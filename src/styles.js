import styled from 'styled-components';
import { memo } from 'react';

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
  width: 2vmin;
  height: 2vmin;
  /* outline: 0.02rem solid gray; */
  border-collapse: collapse;

  background: ${({ variant }) =>
    variant === 'start' ? 'black' : variant === 'end' ? 'red' : null};

  span {
    /* margin: auto; */
    position: absolute;
    top: 50%;
  }
`;
