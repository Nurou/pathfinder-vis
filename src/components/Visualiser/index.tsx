import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Node from '../../data_structures/Node';
import { Box, Span } from '.././Shared';
import { Button } from './styles';
import { ICoordinates, IGridDimensions, IDynFunctions } from '../../types';
import InfoDisplay from './InfoDisplay';
import {
  convertToType,
  coverInTerrain,
  setNodeNeighbors,
  addWallsRandomly,
  populateGrid,
  displayDistances,
  getRandomArbitrary
} from './util';
import { bfs, dijkstras, gbfs, aStar } from '../../algorithms';
import { animateVisits } from './Animate';
import { useStickyState } from '../../hooks/useStickyState';
import Description from './Description';
import { details } from '../../algorithms/details';
import ControlPanel from './ControlPanel';
import Checkbox from './Checkbox';
import { PathFinderSelector } from './PathFinderSelector';
import { GridGraph } from './GridGraph';

const Visualiser = () => {
  /**
   * Grid State
   */
  const [grid, setGrid] = useState<Node[][] | null>([]);
  const [startNodeCoords, setStartNodeCoords] = useState<ICoordinates | null>(null);
  const [endNodeCoords, setEndNodeCoords] = useState<ICoordinates | null>(null);
  const [gridDimensions, _] = useState<IGridDimensions>({ rows: 25, cols: 60 });
  const [conversionType, setConversionType] = useState<string>('start');
  const [mazeGenerated, setMazeGenerated] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [costs, setCosts] = useState<Map<Node, number> | null>(null);

  /**
   * Algorithm Stats State
   */
  const [hasRan, setHasRan] = useState<boolean>(false);
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

  // other component globals - setState not used due to avoid re-rendering
  let mouseIsPressed = false;
  const myRefs: React.MutableRefObject<any> = useRef({});

  // grid initialised after visual is rendered
  useLayoutEffect(() => {
    const grid = populateGrid(gridDimensions);
    // update state
    setGrid(grid);
    // neighbors can be set once grid has been populated
    setNodeNeighbors(grid);
  }, []);

  // runs  after render and useEffects above
  useEffect(() => {
    coverInTerrain(myRefs);
  });

  /**
   * mousedown is fired the moment the button is initially pressed
   * @param {number} row
   * @param {number} col
   */
  const handleMouseDown = (row: number, col: number): void => {
    mouseIsPressed = true;
    convertToType(
      row,
      col,
      conversionType,
      startNodeCoords,
      endNodeCoords,
      setStartNodeCoords,
      setEndNodeCoords,
      myRefs
    );
  };

  /**
   *  fired when a button on a pointing device is released while the pointer is located inside it - counterpoint to mousedown
   */
  const handleMouseUp = () => {
    mouseIsPressed = false;
  };

  /**
   * fired when pointer is over it
   * @param {number} row
   * @param {number} col
   */
  const handleMouseEnter = (row: number, col: number) => {
    if (mouseIsPressed) {
      convertToType(
        row,
        col,
        conversionType,
        startNodeCoords,
        endNodeCoords,
        setStartNodeCoords,
        setEndNodeCoords,
        myRefs
      );
    }
  };

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
      animateVisits(visitedNodesInOrder, shortestPath, myRefs);
      setCosts(costSoFar);
    }
  };

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
      convertToType(
        SN_COORDS.row,
        SN_COORDS.col,
        'start',
        startNodeCoords,
        endNodeCoords,
        setStartNodeCoords,
        setEndNodeCoords,
        myRefs
      );
      convertToType(
        EN_COORDS.row,
        EN_COORDS.col,
        'end',
        startNodeCoords,
        endNodeCoords,
        setStartNodeCoords,
        setEndNodeCoords,
        myRefs
      );
    }

    addWallsRandomly(grid, myRefs);

    setMazeGenerated(true);
  };

  /**
   * toggle the display of distance values
   */
  const handleCheck = (event: any): void => {
    setChecked(event.target.checked);
    if (costs !== null) {
      displayDistances(costs, myRefs);
    }
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
        <GridGraph
          grid={grid}
          myRefs={myRefs}
          handleMouseEnter={handleMouseEnter}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
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
          <Button onClick={() => setConversionType('start')}>Start </Button>
          <Button onClick={() => setConversionType('end')}>Finish</Button>
          <Button onClick={() => setConversionType('wall')}>Add Walls </Button>
          <Button onClick={() => setConversionType('grass')}>Add Grass</Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Button main onClick={() => visualise()}>
            Visualize
          </Button>
          <Box as="label" display="flex" justifyContent="center" alignItems="center" mt={2}>
            <label>
              <Checkbox checked={checked} onChange={handleCheck} />
              <Span ml={1}>Show Distances</Span>
            </label>
          </Box>
          {/* <p>Select speed:</p>
          <div>
            <input type="radio" id="fast"  value="fast" checked />
            <label htmlFor="fast">fast</label>
          </div>

        
          </div> */}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => clear()}>Reset Pathfinder</Button>
          <Button onClick={() => clear(true)}>Clear All</Button>
        </Box>
      </ControlPanel>
    </Box>
  );
};

export default Visualiser;
