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
      color="black"
      bg="white"
      maxWidth="30rem"
      fontSize={[2, 3, 4]}
      lineHeight={3 / 2}
      height="auto"
    >
      <Span>
        <strong>Selected:</strong> {details.title}
      </Span>
      <Span>
        <strong>Description:</strong>
        <br />"{details.description}"
      </Span>
      <Span>
        <strong>Weighted:</strong>
        <Span color={details.weighted ? 'green' : 'red'}>{details.weighted ? ' Yes' : ' No'}</Span>
      </Span>
      <Span>
        <strong>Guarantees Shortest Path: </strong>
        <Span color={details.guarantee ? 'green' : 'red'}>
          {details.guarantee ? ' Yes' : ' No'}
        </Span>
      </Span>
    </AlgoInfo>
  );
};

export default Description;
