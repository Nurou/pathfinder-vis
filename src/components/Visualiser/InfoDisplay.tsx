import React, { useState, useEffect } from 'react';
import { IStatProps } from '../../types';
import { Box, Span, Spacer, H2 } from '../Shared';
import { StatsWrapper, Statistic } from './styles';

/**
 * Component for displaying pathfinder algorithm run statistics
 */
const InfoDisplay = ({ previous, current, children }: IStatProps) => {
  const [timeDiff, setTimeDiff] = useState<number | null>(null);
  const [stepDiff, setStepDiff] = useState<number | null>(null);
  const [movementCostDiff, setMovementCostDiff] = useState<number | null>(null);

  useEffect(() => {
    if (previous && current) {
      setTimeDiff(current.timeTaken - previous.timeTaken);
      setStepDiff(current.shortestPathLength - previous.shortestPathLength);
      setMovementCostDiff(current.totalMovementCost - previous.totalMovementCost);
    }
  }, [previous, current]);

  return (
    <>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        height="auto"
        minHeight="400px"
        bg="rgba(0, 0, 0, 0.7)"
        p={4}
      >
        {previous && (
          <StatsWrapper fontSize={[2, 3, 4]} mr={4} maxWidth="300px">
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
        <StatsWrapper fontSize={[2, 3, 4]} m={4} maxWidth="400px">
          <H2>Current Run</H2>
          <Statistic>
            Pathfinder: <Span>{current ? current.pathfinder : ''}</Span>
          </Statistic>
          <Spacer my={3} />
          <Statistic>
            Time (sec):{' '}
            {current !== null && previous !== null ? (
              <React.Fragment>
                <Span>{(current!.timeTaken / 1000).toFixed(5)}</Span>
                <Span color={timeDiff! <= 0 ? 'green' : 'red'}>
                  {' '}
                  ( {timeDiff! > 0 && '+'} {timeDiff?.toFixed(4)} ms)
                </Span>
              </React.Fragment>
            ) : current && current.timeTaken ? (
              <Span>{(current!.timeTaken / 1000).toFixed(5)} </Span>
            ) : (
              <Span>0</Span>
            )}
          </Statistic>
          <Spacer my={3} />
          <Statistic>
            Number of steps:{' '}
            {current !== null && previous !== null ? (
              <React.Fragment>
                <Span>{current!.shortestPathLength}</Span>
                <Span color={stepDiff! <= 0 ? 'green' : 'red'}>
                  {' '}
                  ( {stepDiff! > 0 && '+'} {stepDiff} )
                </Span>
              </React.Fragment>
            ) : current && current.shortestPathLength ? (
              <Span>{current.shortestPathLength}</Span>
            ) : (
              <Span>0</Span>
            )}
          </Statistic>
          <br />
          <Spacer my={3} />
          <Statistic>
            Total Movement Cost:{' '}
            {current !== null && previous !== null ? (
              <React.Fragment>
                <Span>{current!.totalMovementCost}</Span>
                <Span color={current!.totalMovementCost! >= 0 ? 'green' : 'red'}>
                  {' '}
                  ( {movementCostDiff! > 0 && '+'} {movementCostDiff} )
                </Span>
              </React.Fragment>
            ) : current && current.shortestPathLength ? (
              <Span>{current.shortestPathLength}</Span>
            ) : (
              <Span>0</Span>
            )}
          </Statistic>
        </StatsWrapper>
        {children}
      </Box>
    </>
  );
};

export default InfoDisplay;
