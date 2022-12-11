import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Switch } from './components/Switch';

import { Grid } from './components/Grid';
import {
  clear,
  convertToType,
  createMaze,
  displayDistances,
  populateGrid,
  setNodeNeighbors
} from './util';
import { GridCellConversionControls } from './components/GridCellConversionControls';
import { PathfinderSelector } from './components/PathfinderSelector';
import StatsDisplay from './components/StatsDisplay';
import { CustomMap } from './data_structures/Map';
import GridNode from './data_structures/Node';
import { useStickyState } from './hooks/useStickyState';
import { useWindowSize } from './hooks/useWindowResize';
import {
  CellType,
  Coordinates,
  CoordToNodeDOMElementMap,
  GridDimensions,
  PathfinderRunStatistics
} from './types';

const availablePathfinders = [
  { value: 'Bfs', label: 'Breadth-First Search' },
  { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' },
  { value: 'Gbfs', label: 'Greedy Best-First Search' },
  { value: 'aStar', label: 'A*' }
];

const App = () => {
  const [grid, setGrid] = useState<GridNode[][] | null>(null);
  const sourceNodeCoords = useRef<Coordinates | null>(null);
  const destinationNodeCoords = useRef<Coordinates | null>(null);
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>(() => {
    // initialise grid dimensions based on device width
    const width = document.body.getClientRects()[0].width;
    return {
      rows: 20,
      cols: Math.round(width / 50)
    };
  });
  const [mazeGenerated, setMazeGenerated] = useState<boolean>(false);
  const [movementCosts, setMovementCosts] = useState<CustomMap<GridNode, number> | null>(null);
  const [currentPathFinder, setCurrentPathFinder] = useState<string>(availablePathfinders[0].value);

  const [showDistances, setShowDistances] = useState<boolean>(false);

  // only used to show the border around the selected button
  const [internalSelectedCellConversionType, setInternalSelectedCellConversionType] =
    useState<CellType | null>('source');

  const gridCellDOMElementRefs = useRef<CoordToNodeDOMElementMap | null>(null);
  const selectedCellConversionType = useRef<CellType | null>(null);

  // local storage items
  const [previousRun, setPrevRun] = useState<PathfinderRunStatistics | null>(null);
  const [currentRun, setCurrentRun] = useState<PathfinderRunStatistics | null>(null);

  // set up board on initial render
  useEffect(() => {
    if (grid) {
      createMaze(
        mazeGenerated,
        grid,
        gridCellDOMElementRefs,
        gridDimensions,
        selectedCellConversionType,
        sourceNodeCoords,
        destinationNodeCoords,
        setMazeGenerated
      );
    }
  }, [gridDimensions]);

  /**
   * set the grid dimensions
   * based on the window size
   * */
  useWindowSize((dimensions) => {
    if (!dimensions.height || !dimensions.width) return;
    setGridDimensions({ rows: 20, cols: Math.round(dimensions.width / 45) });
  });

  // grid initialised after visual is rendered
  useLayoutEffect(() => {
    const grid = populateGrid(gridDimensions);
    // update state
    setGrid(grid);
    // neighbors can be set once grid has been populated
    setNodeNeighbors(grid);
  }, [gridDimensions]);

  const handleGenerateMazeClick = () => {
    if (grid) {
      createMaze(
        mazeGenerated,
        grid,
        gridCellDOMElementRefs,
        gridDimensions,
        selectedCellConversionType,
        sourceNodeCoords,
        destinationNodeCoords,
        setMazeGenerated
      );
    }
    setMovementCosts(null);
  };

  /**
   *
   * @param all - if flag is passed, the graph is completely cleared
   */
  const clearGrid = (all: boolean = false) => {
    setShowDistances(false);
    if (grid && gridCellDOMElementRefs.current != null) {
      clear(grid, gridCellDOMElementRefs, all);
    }
  };

  const handleGridCellConversion = useCallback((row: number, col: number) => {
    if (!selectedCellConversionType.current) return;
    if (sourceNodeCoords.current && destinationNodeCoords.current) {
      convertToType(
        row,
        col,
        selectedCellConversionType,
        sourceNodeCoords,
        destinationNodeCoords,
        gridCellDOMElementRefs
      );
    }
  }, []);

  const resetCellConversion = useCallback(() => {
    selectedCellConversionType.current = null;
    setInternalSelectedCellConversionType(null);
  }, []);

  const handleCheckChange = (checked: boolean) => {
    setShowDistances(checked);
    if (movementCosts !== null) {
      displayDistances(movementCosts, gridCellDOMElementRefs);
    }
  };

  if (!grid) return null;

  return (
    <main className="flex flex-col justify-center items-start overflow-hidden py-20 px-10">
      <header>
        <h1 className="text-6xl">Pathfinder Visualiser</h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-10 mt-10 w-full lg:gap-40">
        <PathfinderSelector
          currentPathfinder={currentPathFinder}
          setCurrentPathfinder={setCurrentPathFinder}
          grid={grid}
          sourceNodeCoords={sourceNodeCoords}
          destinationNodeCoords={destinationNodeCoords}
          gridCellDOMElementRefs={gridCellDOMElementRefs}
          currentPathFinder={currentPathFinder}
          currentRun={currentRun}
          setCurrentRun={setCurrentRun}
          setPrevRun={setPrevRun}
          setCosts={setMovementCosts}
          handleGenerateMazeClick={handleGenerateMazeClick}
          handleClearGridClick={() => {
            clearGrid(true);
            setMovementCosts(null);
          }}
          handleResetPathfinder={() => {
            clearGrid();
            setMovementCosts(null);
          }}
        />
        {currentRun && (
          <div className="shadow-xl border border-polar0 p-6 rounded max-w-md">
            <StatsDisplay previous={previousRun} current={currentRun} />
          </div>
        )}
      </div>
      <div className="flex items-center self-start mt-10">
        <GridCellConversionControls
          selectedCellConversionType={selectedCellConversionType}
          internalSelectedCellConversionType={internalSelectedCellConversionType}
          setInternalSelectedCellConversionType={setInternalSelectedCellConversionType}
        />
      </div>
      <div className={`mt-10 mb-2 ${!movementCosts && 'invisible'} `}>
        <Switch checked={showDistances} onChange={handleCheckChange} />
      </div>
      <Grid
        grid={grid}
        sourceNodeCoords={sourceNodeCoords}
        destinationNodeCoords={destinationNodeCoords}
        gridCellDOMElementRefs={gridCellDOMElementRefs}
        handleGridCellConversion={handleGridCellConversion}
        resetCellConversion={resetCellConversion}
      />
    </main>
  );
};

export default App;
