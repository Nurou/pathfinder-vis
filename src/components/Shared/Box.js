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
  grid
} from 'styled-system';

export const Box = styled.div`
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
export const Flex = styled.div`
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
Flex.defaultProps = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Box;
