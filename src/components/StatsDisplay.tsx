import React, { useState, useEffect } from 'react';
import { PathfinderRunStatistics } from '../types';

export interface Props {
  previous: PathfinderRunStatistics | null;
  current: PathfinderRunStatistics | null;
}

const StatsDisplay = ({ previous, current }: Props) => {
  const [timeDiff, setTimeDiff] = useState<number | null>(null);
  const [stepDiff, setStepDiff] = useState<number | null>(null);

  const noPath = (pathLength: number): boolean => {
    return pathLength === -2;
  };

  useEffect(() => {
    if (previous && current && !noPath(previous.shortestPathLength)) {
      setTimeDiff(current.timeTaken - previous.timeTaken);
      setStepDiff(current.shortestPathLength - previous.shortestPathLength);
    } else {
      setTimeDiff(null);
      setStepDiff(null);
    }
  }, [previous, current]);

  return (
    <section className="w-[325px]">
      <div className="flex flex-col gap-4 mt-2">
        <span>Pathfinder: {current?.pathfinder}</span>
        {current?.timeTaken && (
          <div className="flex flex-wrap gap-4">
            <span>Time (sec): {(current.timeTaken / 1000).toFixed(5)}</span>
            {timeDiff && (
              <span className={timeDiff <= 0 ? 'text-success' : 'text-danger'}>
                ( {timeDiff > 0 && '+'} {timeDiff.toFixed(2)} ms)
              </span>
            )}
          </div>
        )}
        {current?.shortestPathLength && (
          <div className="flex flex-wrap gap-4">
            <span>Number of steps: {current.shortestPathLength}</span>
            {stepDiff && stepDiff !== 0 && (
              <span className={stepDiff <= 0 ? 'text-success' : 'text-danger'}>
                ({stepDiff > 0 && '+'} {stepDiff} )
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsDisplay;
