import React from 'react';
import { AlgoInfo } from './styles';
import { Details } from '../../types';

const Description = ({ details, children }: { details: Details; children: any }) => {
  return (
    <AlgoInfo
    // display="flex"
    // justifyContent="space-around"
    // alignItems="center"
    // p={4}
    // color="#1A202C"
    // bg="white"
    // width="100%"
    // fontSize={[1, 2, 2]}
    // lineHeight={3 / 2}
    // height="auto"
    >
      {children}
      <span>
        Description:
        <strong>"{details.description}"</strong>
      </span>
      <span>
        Weighted:
        <span color={details.weighted ? '#68D391' : '#E53E3E'}>
          {details.weighted ? ' Yes' : ' No'}
        </span>
      </span>
      <span>
        Guarantees Shortest Path:
        <span color={details.guarantee ? '#68D391' : '#E53E3E'}>
          {details.guarantee ? ' Yes' : ' No'}
        </span>
      </span>
    </AlgoInfo>
  );
};

export default Description;
