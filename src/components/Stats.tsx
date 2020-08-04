import React from 'react';
import { Box, Span, Spacer } from './Shared';

/**
 * Component for displaying pathfinder algorithm run statistics
 */

interface StatProps {
  timeTaken?: number | null;
  shortestPathLength?: number | null;
  pathFinder?: string | null;
  children?: any;
}

const Stats = (props: StatProps) => {
  return (
    <Box
      bg="rgba(0, 0, 0, 0.7)"
      p={4}
      style={{ boxSizing: 'border-box' }}
      width="100%"
      fontSize={3}
    >
      <Span color="white">
        Pathfinder: <Span style={{ color: 'gold' }}>{props.pathFinder}</Span>
      </Span>
      <br />
      <Spacer my={3} />
      <Span color="white">
        Time:{' '}
        {props.timeTaken && (
          <Span style={{ color: 'gold' }}>{(props.timeTaken! / 1000).toFixed(5)} sec</Span>
        )}
      </Span>{' '}
      <br />
      <Spacer my={3} />
      <Span color="white">
        Shortest path:{' '}
        <Span style={{ color: 'gold' }}>
          {props.shortestPathLength} {props.shortestPathLength && 'nodes'}
        </Span>
      </Span>
      {/* TODO: add total cost */}
      {props.children}
    </Box>
  );
};

export default Stats;
