import styled from 'styled-components'
import { typography, color, space, layout, maxWidth } from 'styled-system'

export const Text = styled.p`
  ${typography};
  ${color};
  ${space};
  ${layout};
  ${maxWidth}
`

Text.defaultProps = {
  fontSize: '1.125rem',
  color: 'black',
  lineHeight: 1.89,
  fontFamily: '"Raleway", "sans-serif"',
}

export default Text
