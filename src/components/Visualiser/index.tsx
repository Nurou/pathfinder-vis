import React, { useState } from 'react';
import { Button } from './styles';
import { bfs, dijkstras, gbfs, aStar } from '../../algorithms';
import { IDynFunctions, TAnimationSpeed, ICoordinates } from '../../types';
import { animateVisits } from '../Animate';
import SpeedSelector from '../SpeedSelector';
import { IVisualiseProps } from '../../types';

const Visualise = ({
  grid,
  startNodeCoords,
  endNodeCoords,
  myRefs,
  currentPathFinder,
  currentRun,
  setCurrentRun,
  setPrevRun,
  setCosts
}: IVisualiseProps) => {
  const [hasRan, setHasRan] = useState<boolean>(false);
  const [visualisationSpeed, setVisualisationSpeed] = useState<TAnimationSpeed>('medium');

  /**
   * Enables individual algorithms to be run based on the name of the one currently selected
   */
  const mapAlgoNameToAlgo: IDynFunctions = {
    Bfs: () => bfs(grid!, startNodeCoords!, endNodeCoords!, myRefs),
    Ucs: () => dijkstras(grid!, startNodeCoords!, endNodeCoords!, myRefs),
    Gbfs: () => gbfs(grid!, startNodeCoords!, endNodeCoords!, myRefs),
    aStar: () => aStar(grid!, startNodeCoords!, endNodeCoords!, myRefs)
  };

  /**
   * determines which algorithm to run based on user selection
   */
  const visualise = (): void => {
    // given we have what we need
    if (grid && startNodeCoords && endNodeCoords && currentPathFinder) {
      // call the selected algorithm
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } = mapAlgoNameToAlgo[
        currentPathFinder
      ]();

      const stats = {
        pathfinder: currentPathFinder,
        timeTaken: timer,
        shortestPathLength: shortestPath.length - 2,
        totalMovementCost: costSoFar.get(grid[endNodeCoords.row][endNodeCoords.col])!
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
      <Button main onClick={() => visualise()}>
        Visualize
      </Button>
    </>
  );
};

export default Visualise;
