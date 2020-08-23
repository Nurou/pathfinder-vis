import styled from 'styled-components';
import { typography, color, space, layout, maxWidth } from 'styled-system';

export const Text = styled.p`
  ${typography};
  ${color};
  ${space};
  ${layout};
  ${maxWidth}
`;

Text.defaultProps = {
  fontSize: '1.125rem',
  lineHeight: 1.89
};

export default Text;
