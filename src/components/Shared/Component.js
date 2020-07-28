/**
 * A generic styled-component
 */
import styled from 'styled-components';

import {
  color,
  space,
  typography,
  layout,
  flexbox,
  background,
  border,
  position,
  zIndex,
  maxWidth,
  shadow,
  grid,
} from 'styled-system';

export const Component = styled.div`
  ${color}
  ${space}
  ${typography}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
  ${position}
  ${zIndex}
  ${maxWidth}
  ${shadow}
  ${grid}
`;

export default Component;
