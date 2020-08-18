import React from 'react';
import { Box, H1, Text, Span } from '../Shared';
import { AlgoInfo } from './styles';

export interface IDetails {
  title: string;
  description: string;
  weighted: boolean;
  guarantee: boolean;
}

const Description = ({ details }: any) => {
  console.log('💩: Description -> details', details);
  return (
    <AlgoInfo
      display="flex"
      flexDirection="column"
      p={4}
      m={4}
      color="#1A202C"
      bg="white"
      // maxWidth="30rem"
      fontSize={[1, 2, 3]}
      lineHeight={3 / 2}
      height="auto"
    >
      <Span>
        Selected:<strong> {details.title}</strong>
      </Span>
      <Span>
        Description:
        <strong>
          <br />"{details.description}"
        </strong>
      </Span>
      <Span>
        Weighted:
        <Span color={details.weighted ? '#68D391' : '#E53E3E'}>
          {details.weighted ? ' Yes' : ' No'}
        </Span>
      </Span>
      <Span>
        Guarantees Shortest Path:
        <Span color={details.guarantee ? '#68D391' : '#E53E3E'}>
          {details.guarantee ? ' Yes' : ' No'}
        </Span>
      </Span>
    </AlgoInfo>
  );
};

export default Description;
