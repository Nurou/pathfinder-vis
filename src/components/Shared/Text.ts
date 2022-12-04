import styled from 'styled-components';
import { typography, color, space, layout, maxWidth } from 'styled-system';

export const Text = styled.p<any>`
  ${typography};
  ${color};
  ${space};
  ${layout};
  ${maxWidth}
`;

export default Text;
