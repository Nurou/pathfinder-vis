import React, { useState, useEffect } from 'react';
import { IStatProps } from '../../types';
import { Box, Span, Spacer, H2, H1, Text } from '../Shared';
import { StatsWrapper, Statistic } from './styles';

/**
 * Component for displaying pathfinder algorithm run statistics
 */

const InfoDisplay = ({ previous, current, children }: IStatProps) => {
  const [timeDiff, setTimeDiff] = useState<number | null>(null);
  const [stepDiff, setStepDiff] = useState<number | null>(null);
  const [movementCostDiff, setMovementCostDiff] = useState<number | null>(null);

  useEffect(() => {
    if (previous && current && !noPath(previous.shortestPathLength)) {
      setTimeDiff(current.timeTaken - previous.timeTaken);
      setStepDiff(current.shortestPathLength - previous.shortestPathLength);
      setMovementCostDiff(current.totalMovementCost - previous.totalMovementCost);
    } else {
      setTimeDiff(null);
      setStepDiff(null);
      setMovementCostDiff(null);
    }
  }, [previous, current]);

  const noPath = (pathLength: number): boolean => {
    return pathLength === -2;
  };

  const displayNoPath = () => (
    <>
      <Statistic>
        Time (sec): <Span style={{ color: '#E53E3E' }}>N/A</Span>
      </Statistic>{' '}
      <Spacer my={3} />
      <Statistic>
        Number of steps:{' '}
        <Span style={{ color: '#E53E3E' }} className="na">
          N/A
        </Span>
      </Statistic>
      <Spacer my={3} />
      <Statistic>
        Total Movement Cost:{' '}
        <Span style={{ color: '#E53E3E' }} className="na">
          N/A
        </Span>
      </Statistic>
    </>
  );

  return (
    <>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        height="auto"
        bg="rgba(0, 0, 0, 0.7)"
        p={3}
      >
        <Box color="#FFFFFF" px={5}>
          <H1 fontSize={5}>Pathfinder Visualiser</H1>
          <Text fontWeight={600} py={3} maxWidth="20rem">
            To get started, choose a pathfinder from the available options, create a maze or
            generate one and hit visualise!
          </Text>
        </Box>
        {previous && (
          <StatsWrapper fontSize={[1, 2, 3]} mr={4} maxWidth="300px">
            <H2>Previous Run</H2>
            <Statistic>
              Pathfinder:
              <Span> {previous.pathfinder}</Span>
            </Statistic>
            <Spacer my={3} />
            {noPath(previous.shortestPathLength) ? (
              displayNoPath()
            ) : (
              <>
                <Spacer my={3} />
                <Statistic>
                  Time (sec): <Span>{(previous.timeTaken / 1000).toFixed(5)} </Span>
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
              </>
            )}
          </StatsWrapper>
        )}
        <StatsWrapper fontSize={[1, 2, 3]} m={4} maxWidth="400px">
          <H2>Current Run </H2>
          <Statistic>Pathfinder: {current && <Span>{current.pathfinder}</Span>}</Statistic>
          <Spacer my={3} />
          {!current || noPath(current!.shortestPathLength) ? (
            displayNoPath()
          ) : (
            <>
              <Statistic>
                Time (sec):{' '}
                {current !== null && previous !== null ? (
                  <>
                    <Span>{(current!.timeTaken / 1000).toFixed(5)}</Span>
                    {timeDiff && (
                      <Span color={timeDiff! <= 0 ? '#68D391' : '#E53E3E'}>
                        {' '}
                        ( {timeDiff! > 0 && '+'} {timeDiff?.toFixed(4)} ms)
                      </Span>
                    )}
                  </>
                ) : current && current.timeTaken ? (
                  <Span>{(current!.timeTaken / 1000).toFixed(5)} </Span>
                ) : (
                  <Span>0</Span>
                )}
              </Statistic>
              <Spacer my={3} />
              <Statistic>
                Number of steps:{' '}
                {current !== null && previous !== null && (
                  <>
                    <Span>{current!.shortestPathLength}</Span>{' '}
                    {stepDiff !== 0 && (
                      <Span color={stepDiff! < 0 ? '#68D391' : '#E53E3E'}>
                        ( {stepDiff! > 0 && '+'} {stepDiff} )
                      </Span>
                    )}
                  </>
                )}
              </Statistic>
              <br />
              <Spacer my={3} />
              <Statistic>
                Total Movement Cost:{' '}
                {current !== null && previous !== null ? (
                  <>
                    <Span>{current!.totalMovementCost}</Span>
                    {movementCostDiff !== 0 && (
                      <Span color={current!.totalMovementCost! >= 0 ? '#68D391' : '#E53E3E'}>
                        {' '}
                        ( {movementCostDiff! > 0 && '+'} {movementCostDiff} )
                      </Span>
                    )}
                  </>
                ) : current && current.shortestPathLength ? (
                  <Span>{current.shortestPathLength}</Span>
                ) : (
                  <Span>0</Span>
                )}
              </Statistic>
            </>
          )}
        </StatsWrapper>
        {children}
      </Box>
    </>
  );
};

export default InfoDisplay;
