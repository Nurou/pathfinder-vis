import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Switch from 'react-switch';
import Node from '../../data_structures/Node';
import { Box, Spacer, Span } from '.././Shared';
import { Button, Grid, GridRow } from './styles';
import { GridNode } from './Node';
import { ICoordinates, IGridDimensions, IDynFunctions } from '../../types';
import Stats from './Stats';
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

const Visualiser = () => {
  /**
   * Grid State
   */
  const [grid, setGrid] = useState<Node[][] | null>([]);
  const [startNodeCoords, setStartNodeCoords] = useState<ICoordinates | null>(null);
  const [endNodeCoords, setEndNodeCoords] = useState<ICoordinates | null>(null);
  const [gridDimensions, _] = useState<IGridDimensions>({ rows: 20, cols: 40 });
  const [conversionType, setConversionType] = useState<string>('start');
  const [mazeGenerated, setMazeGenerated] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [costs, setCosts] = useState<Map<Node, number> | null>(null);

  /**
   * Algorithm Stats State
   */
  const availablePathfinders = [
    { value: 'Bfs', label: 'Breadth-First Search' },
    { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' },
    { value: 'Gbfs', label: 'Greedy Best-First Search' },
    { value: 'aStar', label: 'A*' }
  ];
  const [currentPathFinder, setCurrentPathFinder] = useState<string | null>(
    availablePathfinders[0].value
  );
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [shortestPathLength, setShortestPathLength] = useState<number | null>(null);
  const [totalMovementCost, setTotalMovementCost] = useState<number | null>(null);

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

      // update stats
      setTotalMovementCost(costSoFar.get(grid[endNodeCoords.row][endNodeCoords.col])!);
      setTimeTaken(timer);
      setShortestPathLength(shortestPath.length - 2);
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
    // clear stats
    setShortestPathLength(null);
    setTimeTaken(null);
    setTotalMovementCost(null);
    setCosts(null);
  };

  /**
   * Generates a random maze using walls and positions both the start and end nodes on the grid
   */
  const createMaze = (): void => {
    // if maze already generated, clear previous
    if (mazeGenerated) {
      clear(true);
    }

    const SN_COORDS: ICoordinates = {
      row: getRandomArbitrary(0, gridDimensions!.rows),
      col: getRandomArbitrary(0, gridDimensions!.cols)
    };

    const EN_COORDS: ICoordinates = {
      row: getRandomArbitrary(0, gridDimensions!.rows),
      col: getRandomArbitrary(0, gridDimensions!.cols)
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

  const handleSwitch = (): void => {
    setChecked(!checked);
    if (costs !== null) {
      displayDistances(costs, myRefs);
    }
  };

  return (
    <>
      <Stats
        timeTaken={timeTaken}
        shortestPathLength={shortestPathLength}
        pathFinder={currentPathFinder}
        totalCost={totalMovementCost}
      ></Stats>
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={4}
      >
        <select
          value={currentPathFinder!}
          onChange={(e) => {
            setCurrentPathFinder(e.target.value);
          }}
        >
          <option disabled>Choose pathfinder</option>
          {availablePathfinders.map((o) => (
            <option value={o.value} key={o.label}>
              {o.label}
            </option>
          ))}
        </select>
        <Spacer my={4} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => visualise()}>Visualize</Button>
          <Button onClick={() => clear()}>Reset Pathfinder</Button>
          <Button onClick={() => clear(true)}>Clear All</Button>
          <Box as="label" display="flex" justifyContent="center" alignItems="center">
            <Switch onChange={handleSwitch} checked={checked} />
            <Span color="white" pl={2}>
              Distances
            </Span>
          </Box>
          <Spacer my={4} />
        </Box>
        <Grid>
          {grid &&
            grid.map((row, rowIdx) => (
              <GridRow key={rowIdx}>
                {row.map((node) => {
                  const { row, col } = node;
                  return (
                    <GridNode
                      key={`${row}-${col}`}
                      col={col}
                      row={row}
                      myRefs={myRefs}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </GridRow>
            ))}
        </Grid>
        <Spacer my={3} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={createMaze}>Generate Maze </Button>
          <Button onClick={() => setConversionType('start')}>Start </Button>
          <Button onClick={() => setConversionType('end')}>Finish</Button>
          <Button onClick={() => setConversionType('wall')}>Add Walls </Button>
          <Button onClick={() => setConversionType('grass')}>Add Grass</Button>
        </Box>
        <Spacer my={3} />
      </Box>
    </>
  );
};

export default Visualiser;
