import styled from 'styled-components';

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
