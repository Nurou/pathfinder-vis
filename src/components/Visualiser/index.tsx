import React, { useState } from 'react';
import { Button } from './styles';
import { bfs, dijkstras, gbfs, aStar } from '../../algorithms';
import { IDynFunctions, TAnimationSpeed } from '../../types';
import { animateVisits } from '../Animate';
import SpeedSelector from '../SpeedSelector';
import { IVisualiserProps } from '../../types';

const Visualiser = ({
  grid,
  startNodeCoords,
  endNodeCoords,
  myRefs,
  currentPathFinder,
  currentRun,
  setCurrentRun,
  setPrevRun,
  setCosts
}: IVisualiserProps) => {
  const [hasRan, setHasRan] = useState<boolean>(false);
  const [visualisationSpeed, setVisualisationSpeed] = useState<TAnimationSpeed>('fast');
  // const [simulationIsRunning] = useState(false);

  /**
   * Enables individual algorithms to be run based on the name of the one currently selected
   */
  const mapAlgoNameToAlgo: IDynFunctions = {
    Bfs: () => bfs(grid!, startNodeCoords.current, endNodeCoords.current, myRefs),
    Ucs: () => dijkstras(grid!, startNodeCoords.current, endNodeCoords.current, myRefs),
    Gbfs: () => gbfs(grid!, startNodeCoords.current, endNodeCoords.current, myRefs),
    aStar: () => aStar(grid!, startNodeCoords.current, endNodeCoords.current, myRefs)
  };

  const handleClick = () => {
    visualise();
  };

  /**
   * determines which algorithm to run based on user selection
   */
  const visualise = (): void => {
    // given we have what we need
    if (grid && startNodeCoords.current && endNodeCoords.current && currentPathFinder) {
      // call the selected algorithm
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } = mapAlgoNameToAlgo[
        currentPathFinder
      ]();

      const stats = {
        pathfinder: currentPathFinder,
        timeTaken: timer,
        shortestPathLength: shortestPath.length - 2,
        totalMovementCost: costSoFar.get(
          grid[endNodeCoords.current.row][endNodeCoords.current.col]
        )!
      };

      // first run? update state
      if (!hasRan) {
        setHasRan(true);
        setCurrentRun(stats);
      } else {
        // shift the runs
        setPrevRun(currentRun);
        setCurrentRun(stats);
      }

      animateVisits(visitedNodesInOrder, shortestPath, myRefs, visualisationSpeed);
      setCosts(costSoFar);
    }
  };

  return (
    <>
      <SpeedSelector setVisualisationSpeed={setVisualisationSpeed} />
      <Button main onClick={handleClick}>
        Visualize
      </Button>
    </>
  );
};

export default Visualiser;
