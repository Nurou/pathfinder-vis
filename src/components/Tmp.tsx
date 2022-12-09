import React, { useState } from 'react';
import { RefreshCw, XCircle, Grid } from 'lucide-react';
import { aStar, bfs, dijkstras, gbfs } from '../algorithms';
import { CustomMap } from '../data_structures/Map';
import GridNode from '../data_structures/Node';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  DynamicFunctions as AlgoLabelToFunction,
  PathfinderRunStatistics
} from '../types';
import { animateVisits } from './Animate';
import { Slider } from './Slider';
import { TooltipWrapper } from './TooltipWrapper';

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
  startNodeCoords: React.RefObject<Coordinates | null>;
  endNodeCoords: React.RefObject<Coordinates | null>;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
  currentRun: PathfinderRunStatistics | null;
  setCurrentRun: React.Dispatch<React.SetStateAction<PathfinderRunStatistics | null>>;
  setPrevRun: React.Dispatch<React.SetStateAction<PathfinderRunStatistics | null>>;
  setCosts: React.Dispatch<
    React.SetStateAction<Map<GridNode, number> | CustomMap<GridNode, number> | null>
  >;
  currentPathFinder?: string | null;
  handleGenerateMazeClick: () => void;
  handleClearGridClick: () => void;
  handleResetPathfinder: () => void;
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
    setCosts,
    handleGenerateMazeClick,
    handleClearGridClick,
    handleResetPathfinder
  } = props;

  const [visualisationSpeed, setVisualisationSpeed] = useState(80);
  const [hasRan, setHasRan] = useState<boolean>(false);

  const mapAlgoLabelToFunction: AlgoLabelToFunction = {
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
    <div className="flex gap-8 self-start flex-wrap">
      <div className="flex flex-col self-start">
        <fieldset>
          <legend className="text-lg font-bold">Choose pathfinder:</legend>
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
      <div className="flex flex-col ">
        <span className="text-lg font-bold">Select speed:</span>
        <Slider onChangeCb={setVisualisationSpeed} value={visualisationSpeed} />
        <button
          className="bg-polar1 hover:bg-polar2 text-white py-2 px-4 rounded mt-4"
          onClick={() => visualise()}
        >
          Visualise
        </button>
        <div className="flex flex-wrap justify-start  max-w-fit pt-1 gap-1 my-2 ">
          <TooltipWrapper tooltipText="Reset pathfinder">
            <button
              className="bg-polar1 hover:bg-polar2 text-white py-2 px-4 rounded mt-4 flex items-center justify-center gap-2"
              onClick={handleResetPathfinder}
            >
              <RefreshCw size={20} strokeWidth={1.5} color="white" />
            </button>
          </TooltipWrapper>
          <TooltipWrapper tooltipText="Regenerate maze">
            <button
              className="bg-polar1 hover:bg-polar2 text-white py-2 px-4 rounded mt-4 flex items-center justify-center gap-2"
              onClick={handleGenerateMazeClick}
            >
              <Grid size={20} strokeWidth={1.5} color="white" />
            </button>
          </TooltipWrapper>
          <TooltipWrapper tooltipText="Clear grid">
            <button
              className="bg-polar1 hover:bg-polar2 text-white py-2 px-4 rounded mt-4 flex items-center justify-center gap-2"
              onClick={handleClearGridClick}
            >
              <XCircle size={20} strokeWidth={1.5} color="white" />
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};
