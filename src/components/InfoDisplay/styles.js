import styled from 'styled-components';
import { Box, Span } from '../Shared';

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
  .na {
    color: #e53e3e;
  }
  span:nth-of-type(1) {
    :not(.na) {
      color: #ecc94b;
    }
  }
`;
