import React from 'react';
import { Span } from '../Shared';
import { AlgoInfo } from './styles';
import { Details } from '../../types';

const Description = ({ details, children }: { details: Details; children: any }) => {
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
