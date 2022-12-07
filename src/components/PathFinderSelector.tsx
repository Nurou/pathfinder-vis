import React, { useState } from 'react';
import { aStar, bfs, dijkstras, gbfs } from '../algorithms';
import { CustomMap } from '../data_structures/Map';
import GridNode from '../data_structures/Node';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  DynamicFunctions as AlgoLabelToFunction
} from '../types';
import { animateVisits } from './Animate';
import Slider from './Slider';
import SpeedSelector from './SpeedSelector';

const availablePathfinders = [
  { value: 'Bfs', label: 'Breadth-First Search' },
  { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' },
  { value: 'Gbfs', label: 'Greedy Best-First Search' },
  { value: 'aStar', label: 'A*' }
];

interface Props {
  currentPathfinder: string;
  setCurrentPathfinder: React.Dispatch<React.SetStateAction<string>>;
  grid: GridNode[][];
  startNodeCoords: React.RefObject<Coordinates>;
  endNodeCoords: React.RefObject<Coordinates>;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
  currentRun: any;
  setCurrentRun: React.Dispatch<any>;
  setPrevRun: React.Dispatch<any>;
  setCosts: React.Dispatch<
    React.SetStateAction<Map<GridNode, number> | CustomMap<GridNode, number> | null>
  >;
  currentPathFinder?: string | null;
}

export const PathfinderSelector = (props: Props) => {
  const {
    grid,
    startNodeCoords,
    endNodeCoords,
    gridCellDOMElementRefs,
    currentPathFinder,
    currentRun,
    setCurrentRun,
    setPrevRun,
    setCosts
  } = props;

  const [visualisationSpeed, setVisualisationSpeed] = useState(80);
  const [hasRan, setHasRan] = useState<boolean>(false);

  const mapAlgoLabelToFunction: AlgoLabelToFunction = {
    Bfs: () => bfs(grid, startNodeCoords.current, endNodeCoords.current, gridCellDOMElementRefs),
    Ucs: () =>
      dijkstras(grid, startNodeCoords.current, endNodeCoords.current, gridCellDOMElementRefs),
    Gbfs: () => gbfs(grid, startNodeCoords.current, endNodeCoords.current, gridCellDOMElementRefs),
    aStar: () => aStar(grid, startNodeCoords.current, endNodeCoords.current, gridCellDOMElementRefs)
  };

  /**
   * determines which algorithm to run based on user selection
   */
  const visualise = (): void => {
    // given we have what we need
    if (grid && startNodeCoords.current && endNodeCoords.current && currentPathFinder) {
      // call the selected algorithm
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } =
        mapAlgoLabelToFunction[currentPathFinder]();

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

  return (
    <div className="flex gap-8 self-start flex-wrap mt-4">
      <div className="flex flex-col self-start">
        <fieldset>
          <legend>Choose pathfinder:</legend>
          <div className="flex flex-col gap-4 mt-2">
            {availablePathfinders.map((pathfinder) => (
              <div key={pathfinder.label} className="flex gap-4 justify-start items-center ">
                <input
                  className="h-6 w-6 accent-snow2 "
                  type="radio"
                  id={pathfinder.value}
                  name="pathfinder"
                  value={pathfinder.value}
                  onChange={(e) => props.setCurrentPathfinder(e.target.value)}
                  checked={props.currentPathfinder === pathfinder.value}
                />
                <label htmlFor={pathfinder.value}>{pathfinder.label}</label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col">
        <span>Select speed:</span>
        <Slider onChangeCb={setVisualisationSpeed} value={visualisationSpeed} />
        <button
          className="bg-polar1 hover:bg-polar2 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => visualise()}
        >
          Visualize
        </button>
      </div>
    </div>
  );
};
