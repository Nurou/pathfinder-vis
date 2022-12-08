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
import StatsDisplay from './components/StatsDisplay';
import { PathfinderSelector } from './components/PathfinderSelector';
import { CustomMap } from './data_structures/Map';
import GridNode from './data_structures/Node';
import { useStickyState } from './hooks/useStickyState';
import { useWindowSize } from './hooks/useWindowResize';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  GridCellConversionTypes as GridCellConversionType,
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
  const startNodeCoords = useRef<Coordinates | null>(null);
  const endNodeCoords = useRef<Coordinates | null>(null);
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

  const gridCellDOMElementRefs = useRef<CoordToNodeDOMElementMap | null>(null);
  const selectedCellConversionType = useRef<string | null>(null);
  console.log('💩 ~ file: App.tsx:55 ~ selectedCellConversionType', selectedCellConversionType);

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
        startNodeCoords,
        endNodeCoords,
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
        startNodeCoords,
        endNodeCoords,
        setMazeGenerated
      );
    }
  };

  /**
   *
   * @param all - if flag is present, the graph is completely cleared
   */
  const clearGrid = (all: boolean = false) => {
    setChecked(false);
    if (grid && gridCellDOMElementRefs.current != null) {
      clear(grid, gridCellDOMElementRefs, all);
    }
  };

  const handleGridCellConversion = useCallback((row: number, col: number) => {
    if (startNodeCoords.current && endNodeCoords.current) {
      convertToType(
        row,
        col,
        selectedCellConversionType,
        startNodeCoords,
        endNodeCoords,
        gridCellDOMElementRefs
      );
    }
  }, []);

  if (!grid) return null;

  return (
    <main className="flex flex-col justify-center items-start overflow-hidden py-20 px-10">
      <header>
        <h1 className="text-6xl">Pathfinder Visualiser</h1>
      </header>
      <div className="flex flex-col lg:flex-row justify-center items-baseline gap-10 mt-10">
        <PathfinderSelector
          currentPathfinder={currentPathFinder}
          setCurrentPathfinder={setCurrentPathFinder}
          grid={grid}
          startNodeCoords={startNodeCoords}
          endNodeCoords={endNodeCoords}
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
        <StatsDisplay previous={previousRun} current={currentRun} />
      </div>
      <Grid
        grid={grid}
        startNodeCoords={startNodeCoords}
        endNodeCoords={endNodeCoords}
        gridCellDOMElementRefs={gridCellDOMElementRefs}
        handleGridCellConversion={handleGridCellConversion}
        updateGridCellConversionType={(type: GridCellConversionType) => {
          selectedCellConversionType.current = type;
        }}
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
