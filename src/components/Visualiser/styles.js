import styled from 'styled-components';

export const Button = styled.button`
  padding: ${(props) => (props.main ? '1.5rem' : '1rem')};
  margin: 0 0.5rem;
  font-family: 'Source Code Pro', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  background: ${(props) => (props.main ? '#F56565' : '#cbd5e0')};
  color: ${(props) => (props.main ? 'white' : '#2d3748')};
  border: ${(props) => (props.main ? '3px solid #9B2C2C' : 'none')};
`;
