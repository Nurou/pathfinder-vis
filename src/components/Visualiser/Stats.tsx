import React, { useState, useEffect } from 'react';
import { Box, Span, Spacer, H1, H2 } from '../Shared';
import { useStickyState } from '../../hooks/useStickyState';
import { StatsWrapper } from './styles';

/**
 * Component for displaying pathfinder algorithm run statistics
 */

interface StatProps {
  timeTaken?: number | null;
  shortestPathLength?: number | null;
  pathFinder?: string | null;
  totalCost?: number | null;
  previous?: object;
  children?: any;
}

/* 
TODO
  if this is not first run, display two items:
  1st -  previous stats (localStorage)
  2nd -  new stats
*/

const Stats = (props: StatProps) => {
  return (
    <>
      <StatsWrapper py={4} px={7} width="100%" fontSize={3}>
        <H2
          style={{
            textDecoration: 'underline'
          }}
        >
          Previous Run
        </H2>
        <Span>
          Pathfinder: <Span style={{ color: 'gold' }}>{props.pathFinder}</Span>
        </Span>
        <br />
        <Spacer my={3} />
        <Span>
          Time (sec):{' '}
          {props.timeTaken && (
            <Span style={{ color: 'gold' }}>{(props.timeTaken / 1000).toFixed(5)} </Span>
          )}
        </Span>{' '}
        <br />
        <Spacer my={3} />
        <Span>
          Number of steps: <Span style={{ color: 'gold' }}>{props.shortestPathLength}</Span>
        </Span>
        <br />
        <Spacer my={3} />
        <Span>
          Total Movement Cost: <Span style={{ color: 'gold' }}>{props.totalCost}</Span>
        </Span>
        {props.children}
      </StatsWrapper>
      <pre>{JSON.stringify(props.previous)}</pre>
    </>
  );
};

export default Stats;
