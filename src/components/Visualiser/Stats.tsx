import React, { useState, useEffect } from 'react';
import { Box, Span, Spacer, H1, H2 } from '../Shared';
import { useStickyState } from '../../hooks/useStickyState';
import { StatsWrapper, Statistic } from './styles';

/**
 * Component for displaying pathfinder algorithm run statistics
 */

interface StatItems {
  pathfinder: string;
  shortestPathLength: number;
  timeTaken: number;
  totalMovementCost: number;
}

interface StatProps {
  previous?: StatItems;
  current?: StatItems;
  children?: any;
}

const Stats = ({ previous, current }: StatProps) => {
  return (
    <Box display="flex" justifyContent="space-around" width="100%" bg="rgba(0, 0, 0, 0.7)" p={4}>
      {previous && (
        <StatsWrapper fontSize={3}>
          <H2>Previous Run</H2>
          <Statistic>
            Pathfinder: <Span>{previous.pathfinder}</Span>
          </Statistic>
          <Spacer my={3} />
          <Statistic>
            Time (sec):{' '}
            {previous.timeTaken && <Span>{(previous.timeTaken / 1000).toFixed(5)} </Span>}
          </Statistic>{' '}
          <Spacer my={3} />
          <Statistic>
            Number of steps: <Span>{previous.shortestPathLength}</Span>
          </Statistic>
          <br />
          <Spacer my={3} />
          <Statistic>
            Total Movement Cost: <Span>{previous.totalMovementCost}</Span>
          </Statistic>
        </StatsWrapper>
      )}
      <StatsWrapper fontSize={3}>
        <H2>Current Run</H2>
        <Statistic>
          Pathfinder: <Span>{current ? current.pathfinder : ''}</Span>
        </Statistic>
        <Spacer my={3} />
        <Statistic>
          Time (sec):{' '}
          {current && current.timeTaken ? (
            <Span>{(current!.timeTaken / 1000).toFixed(5)} </Span>
          ) : (
            <Span color="red">0</Span>
          )}
        </Statistic>{' '}
        <Spacer my={3} />
        <Statistic>
          Number of steps: <Span>{current ? current.shortestPathLength : 0}</Span>
        </Statistic>
        <br />
        <Spacer my={3} />
        <Statistic>
          Total Movement Cost: <Span>{current ? current.totalMovementCost : 0}</Span>
        </Statistic>
      </StatsWrapper>
    </Box>
  );
};

export default Stats;
