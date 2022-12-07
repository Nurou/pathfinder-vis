import styled from 'styled-components';

export const Statistic = styled.span`
  white-space: nowrap;
  color: white;
  .na {
    color: #e53e3e;
  }
  span:nth-of-type(1) {
    :not(.na) {
      color: #ecc94b;
    }
  }
`;
