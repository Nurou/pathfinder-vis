import React, { useState, useRef, useLayoutEffect } from 'react';
import Node from './data_structures/Node';
import { Box, Span } from './components/Shared';
import { Button } from './components/Visualiser/styles';
import { ICoordinates, IGridDimensions } from './types';
import InfoDisplay from './components/InfoDisplay';
import {
  convertToType,
  setNodeNeighbors,
  addWallsRandomly,
  populateGrid,
  getRandomArbitrary
} from './util';
import { useStickyState } from './hooks/useStickyState';
import Description from './components/Description';
import { details } from './algorithms/details';
import ControlPanel from './components/ControlPanel';
import Checkbox from './components/Checkbox';
import { PathFinderSelector } from './components/PathFinderSelector';
import { Graph } from './components/Graph/Graph';
import Visualiser from './components/Visualiser';

const App = () => {
  /**
   * Grid State
   */
  const [grid, setGrid] = useState<Node[][] | null>([]);
  const startNodeCoords = useRef(null);
  const endNodeCoords = useRef(null);
  const [gridDimensions, _] = useState<IGridDimensions>({
    rows: 15,
    cols: 40
  });

  const conversionType = useRef('');

  const [mazeGenerated, setMazeGenerated] = useState<boolean>(false);
  const [costs, setCosts] = useState<Map<Node, number> | null>(null);

  /**
   * Algorithm Stats State
   */
  const [prevRun, setPrevRun] = useStickyState(null, 'previous_run');
  const [currentRun, setCurrentRun] = useStickyState(null, 'current_run');

  const availablePathfinders = [
    { value: 'Bfs', label: 'Breadth-First Search' },
    { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' },
    { value: 'Gbfs', label: 'Greedy Best-First Search' },
    { value: 'aStar', label: 'A*' }
  ];

  const [currentPathFinder, setCurrentPathFinder] = useState<string | null>(
    availablePathfinders[0].value
  );

  const myRefs: React.MutableRefObject<any> = useRef({});

  // grid initialised after visual is rendered
  useLayoutEffect(() => {
    const grid = populateGrid(gridDimensions);
    // update state
    setGrid(grid);
    // neighbors can be set once grid has been populated
    setNodeNeighbors(grid);
  }, []);

  /**
   * clears the graph/grid so algorithm can be run again or a different one
   * @param {object} grid - 2D array of the logical grid nodes in their current state (after algorithm has run)
   * @param {object} myRefs
   */
  const clear = (all?: boolean): void => {
    if (!grid) return;
    for (const row of grid) {
      for (const node of row) {
        const domNode = myRefs.current[`node-${node.row}-${node.col}`];
        if (!isNaN(domNode.innerHTML)) {
          domNode.innerHTML = null;
        }
        // when clearing the whole graph
        if (all) {
          domNode.classList.remove('node-visited', 'node-shortest-path', 'wall', 'grass');
          domNode.classList.add('regular');
        } else if (
          domNode.classList.contains('node-visited') ||
          domNode.classList.contains('node-shortest-path')
        ) {
          domNode.classList.remove('node-visited', 'node-shortest-path');
          domNode.classList.add('regular');
        }
      }
    }
  };

  /**
   * Generates a random maze using walls and positions both the start and end nodes on the grid
   */
  const createMaze = (): void => {
    // if maze already generated, clear previous
    if (mazeGenerated) {
      clear(true);
    }

    // restrict to LHS of grid
    const SN_COORDS: ICoordinates = {
      row: getRandomArbitrary(0, gridDimensions!.rows),
      col: getRandomArbitrary(0, gridDimensions!.cols / 2)
    };

    // restrict to RHS of grid
    const EN_COORDS: ICoordinates = {
      row: getRandomArbitrary(0, gridDimensions!.rows),
      col: getRandomArbitrary(gridDimensions!.cols / 2, gridDimensions!.cols)
    };

    // add start and end nodes
    if (SN_COORDS && EN_COORDS) {
      conversionType.current = 'start';
      convertToType(
        SN_COORDS.row,
        SN_COORDS.col,
        conversionType,
        startNodeCoords,
        endNodeCoords,
        myRefs
      );
      conversionType.current = 'end';
      convertToType(
        EN_COORDS.row,
        EN_COORDS.col,
        conversionType,
        startNodeCoords,
        endNodeCoords,
        myRefs
      );
    }

    addWallsRandomly(grid, myRefs);

    setMazeGenerated(true);
  };

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <InfoDisplay previous={prevRun} current={currentRun} />
      {grid && (
        <Graph
          grid={grid}
          conversionType={conversionType}
          startNodeCoords={startNodeCoords}
          endNodeCoords={endNodeCoords}
          myRefs={myRefs}
        />
      )}
      {currentPathFinder && (
        <Description details={details[currentPathFinder]}>
          <PathFinderSelector
            currentPathfinder={currentPathFinder}
            setCurrentPathfinder={setCurrentPathFinder}
            availablePathfinders={availablePathfinders}
          />
        </Description>
      )}
      <ControlPanel
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        p={5}
        bg="#E2E8F0"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={createMaze}>{mazeGenerated ? 'Regenerate' : 'Generate'} Maze </Button>
          <Button onClick={() => (conversionType.current = 'start')}>Start </Button>
          <Button onClick={() => (conversionType.current = 'end')}>Finish</Button>
          <Button onClick={() => (conversionType.current = 'wall')}>Add Walls </Button>
          <Button onClick={() => (conversionType.current = 'grass')}>Add Grass</Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Visualiser
            grid={grid}
            startNodeCoords={startNodeCoords}
            endNodeCoords={endNodeCoords}
            myRefs={myRefs}
            currentPathFinder={currentPathFinder!}
            currentRun={currentRun}
            setCurrentRun={setCurrentRun}
            setPrevRun={setPrevRun}
            setCosts={setCosts}
          />
          <Box as="label" display="flex" justifyContent="center" alignItems="center" mt={3}>
            <label>
              <Checkbox costs={costs} myRefs={myRefs} />
              <Span ml={1}>Show Distances</Span>
            </label>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => clear()}>Reset Pathfinder</Button>
          <Button onClick={() => clear(true)}>Clear All</Button>
        </Box>
      </ControlPanel>
    </Box>
  );
};

export default App;
