import styled from 'styled-components';

export const NodeWrapper = styled('td')`
  position: relative;
  width: auto;
  height: 2rem;

  text-align: center;
  vertical-align: middle;
  line-height: 2rem;

  span {
    position: absolute;
    top: 50%;
  }
`;
