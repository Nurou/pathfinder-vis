import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Checkbox from './components/Checkbox';
import ControlPanel from './components/ControlPanel';
import { Grid } from './components/Graph/Graph';
import {
  clear,
  convertToType,
  createMaze,
  populateGrid,
  setNodeNeighbors
} from './components/Graph/util';
import { GridCellConversionControls } from './components/GridCellConversionControls';
import { PathfinderSelector } from './components/PathfinderSelector';
import StatsDisplay from './components/StatsDisplay';
import { CustomMap } from './data_structures/Map';
import GridNode from './data_structures/Node';
import { useStickyState } from './hooks/useStickyState';
import { useWindowSize } from './hooks/useWindowResize';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  CellType,
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
  const [costs, setCosts] = useState<Map<GridNode, number> | CustomMap<GridNode, number> | null>(
    null
  );
  const [currentPathFinder, setCurrentPathFinder] = useState<string>(availablePathfinders[0].value);
  // this is here (and not in checkbox component) so that it can be unchecked when the grid is cleared
  const [checked, setChecked] = useState<boolean>(false);

  // only used to show the border around the selected button
  const [internalSelectedCellConversionType, setInternalSelectedCellConversionType] =
    useState<CellType | null>(null);

  const gridCellDOMElementRefs = useRef<CoordToNodeDOMElementMap | null>(null);
  const selectedCellConversionType = useRef<CellType | null>(null);

  // local storage items
  const [previousRun, setPrevRun] = useStickyState<PathfinderRunStatistics | null>(
    null,
    'previousRun'
  );
  const [currentRun, setCurrentRun] = useStickyState<PathfinderRunStatistics | null>(
    null,
    'currentRun'
  );

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
  };

  /**
   *
   * @param all - if flag is passed, the graph is completely cleared
   */
  const clearGrid = (all: boolean = false) => {
    setChecked(false);
    if (grid && gridCellDOMElementRefs.current != null) {
      clear(grid, gridCellDOMElementRefs, all);
    }
  };

  const handleGridCellConversion = useCallback((row: number, col: number) => {
    console.log('triggered');
    console.log(
      '💩 ~ file: App.tsx:145 ~ selectedCellConversionType.curren',
      selectedCellConversionType.current
    );

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
          setCosts={setCosts}
          handleGenerateMazeClick={handleGenerateMazeClick}
          handleClearGridClick={() => clearGrid(true)}
          handleResetPathfinder={() => clearGrid()}
        />
        {currentRun && (
          <div className="shadow-xl border border-polar0 p-6 rounded ">
            <StatsDisplay previous={previousRun} current={currentRun} />
          </div>
        )}
      </div>
      <div className="self-start mt-10">
        <GridCellConversionControls
          selectedCellConversionType={selectedCellConversionType}
          internalSelectedCellConversionType={internalSelectedCellConversionType}
          setInternalSelectedCellConversionType={setInternalSelectedCellConversionType}
        />
      </div>
      <Grid
        grid={grid}
        sourceNodeCoords={sourceNodeCoords}
        destinationNodeCoords={destinationNodeCoords}
        gridCellDOMElementRefs={gridCellDOMElementRefs}
        handleGridCellConversion={handleGridCellConversion}
        resetCellConversion={resetCellConversion}
      />
      {/* {currentPathFinder && (
        <Description details={details[currentPathFinder]}>
          <PathFinderSelector
            currentPathfinder={currentPathFinder}
            setCurrentPathfinder={setCurrentPathFinder}
            availablePathfinders={availablePathfinders}
          />
        </Description>
      )} */}
      <ControlPanel>
        {grid && (
          <div>
            <div>
              <label>
                <Checkbox
                  costs={costs}
                  gridCellDOMElementRefs={gridCellDOMElementRefs}
                  checked={checked}
                  setChecked={setChecked}
                />
                <span>Show Distances</span>
              </label>
            </div>
          </div>
        )}
      </ControlPanel>
    </main>
  );
};

export default App;
