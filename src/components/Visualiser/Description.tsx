import React from 'react';
import { Box, H1, Text, Span } from '../Shared';
import { AlgoInfo } from './styles';

export interface IDetails {
  title: string;
  description: string;
  weighted: boolean;
  guarantee: boolean;
}

const Description = ({ details, children }: any) => {
  return (
    <AlgoInfo
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      p={4}
      color="#1A202C"
      bg="white"
      width="100%"
      fontSize={[1, 2, 2]}
      lineHeight={3 / 2}
      height="auto"
    >
      {children}
      {/* <Span>
        Selected:<strong> {details.title}</strong>
      </Span> */}
      <Span>
        Description:
        <strong>"{details.description}"</strong>
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
