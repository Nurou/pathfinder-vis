import styled from 'styled-components';

import {
  color,
  space,
  typography,
  layout,
  background,
  border,
  position,
  zIndex
} from 'styled-system';

export const H1 = styled.h1`
  ${color}
  ${space}
  ${typography}
  ${layout}
  ${background}
  ${border}
  ${position}
  ${zIndex}
`;
H1.defaultProps = {
  lineHeight: 1.25,
  letterSpacing: 12
};

export const H2 = H1.withComponent('h2');
export const H3 = H1.withComponent('h3');
export const H4 = H1.withComponent('h4');

export default H1;
