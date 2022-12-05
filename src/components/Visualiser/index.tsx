import React, { useEffect, useRef, useState } from 'react';
import { Button } from './styles';
import { bfs, dijkstras, gbfs, aStar } from '../../algorithms';
import { DynamicFunctions, AnimationSpeed, Coordinates } from '../../types';
import { animateVisits } from '../Animate';
import SpeedSelector from '../SpeedSelector';
import { CustomMap } from '../../data_structures/Map';
import GridNode from '../../data_structures/Node';

interface VisualiserProps {
  grid: GridNode[][];
  startNodeCoords: React.MutableRefObject<Coordinates | null>;
  endNodeCoords: React.MutableRefObject<Coordinates | null>;
  gridCellDOMElementRefs: any;
  currentRun: any;
  setCurrentRun: React.Dispatch<any>;
  setPrevRun: React.Dispatch<any>;
  setCosts: React.Dispatch<
    React.SetStateAction<Map<GridNode, number> | CustomMap<GridNode, number> | null>
  >;
  currentPathFinder?: string | null;
}

const Visualiser = ({
  grid,
  startNodeCoords,
  endNodeCoords,
  gridCellDOMElementRefs: gridCellDOMElementRefs,
  currentPathFinder,
  currentRun,
  setCurrentRun,
  setPrevRun,
  setCosts
}: VisualiserProps) => {
  const [hasRan, setHasRan] = useState<boolean>(false);
  const [visualisationSpeed, setVisualisationSpeed] = useState<AnimationSpeed>('fast');

  /**
   * Enables individual algorithms to be run based on the name of the one currently selected
   */
  const mapAlgoNameToAlgo: DynamicFunctions = {
    Bfs: () => bfs(grid, startNodeCoords.current!, endNodeCoords.current!, gridCellDOMElementRefs),
    Ucs: () =>
      dijkstras(grid, startNodeCoords.current!, endNodeCoords.current!, gridCellDOMElementRefs),
    Gbfs: () =>
      gbfs(grid, startNodeCoords.current!, endNodeCoords.current!, gridCellDOMElementRefs),
    aStar: () =>
      aStar(grid, startNodeCoords.current!, endNodeCoords.current!, gridCellDOMElementRefs)
  };

  /**
   * determines which algorithm to run based on user selection
   */
  const visualise = (): void => {
    // given we have what we need
    if (grid && startNodeCoords.current && endNodeCoords.current && currentPathFinder) {
      // call the selected algorithm
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } =
        mapAlgoNameToAlgo[currentPathFinder]();

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

      animateVisits(visitedNodesInOrder, shortestPath, gridCellDOMElementRefs, visualisationSpeed);
      setCosts(costSoFar);
    }
  };

  const handleClick = () => {
    visualise();
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
