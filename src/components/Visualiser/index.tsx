import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Node from '../../data_structures/Node';
import { Box, Spacer } from '.././Shared';
import { Button, Grid, GridRow } from '../../styles';
import { GridNode } from '.././Node';
import { Coordinates } from '../../types';
import { bfs } from '../../algorithms/Bfs';
import Stats from '.././Stats';
import { animatePathFinding } from '.././animate';
import { convertToType, coverInTerrain, setNodeNeighbors } from './util';
import { dijkstras } from '../../algorithms/Dijkstras';

const Visualiser = () => {
  console.log('Rendered: Visualiser');

  /**
   * Grid State
   */
  const [grid, setGrid] = useState<Node[][] | null>([]);
  const [startNodeCoords, setStartNodeCoords] = useState<Coordinates | null>(null);
  const [endNodeCoords, setEndNodeCoords] = useState<Coordinates | null>(null);
  const [conversionType, setConversionType] = useState('start');

  /**
   * Algorithm Stats State
   */
  const availablePathfinders = [
    { value: 'Bfs', label: 'Breadth-first Search' },
    { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' }
  ];
  const [currentPathFinder, setCurrentPathFinder] = useState<string | null>(
    availablePathfinders[0].value
  );
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [shortestPathLength, setShortestPathLength] = useState<number | null>(null);
  const [totalMovementCost, setTotalMovementCost] = useState<number | null>(null);

  // other component globals - setState not used due to avoid re-rendering
  let mouseIsPressed = false;
  let myRefs: React.MutableRefObject<any> = useRef({});

  // grid initialised after visual is rendered
  useLayoutEffect(() => {
    // grid dimensions
    const GRID_ROWS: number = 20;
    const GRID_COLS: number = 40;

    let grid: Node[][] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        // add a node for each row column
        let newNode = new Node(row, col);
        currentRow.push(newNode);
      }
      // add the whole row
      grid.push(currentRow);
    }

    // update state
    setGrid(grid);

    // neighbors can be set once grid has been populated
    setNodeNeighbors(grid);
  }, []);

  // runs last after render and useEffects above
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
   * runs BFS algorithm and animation
   */
  const runBfs = () => {
    if (grid && startNodeCoords && endNodeCoords) {
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } = bfs(
        grid,
        startNodeCoords,
        endNodeCoords,
        myRefs
      );
      setTotalMovementCost(costSoFar.get(grid[endNodeCoords.row][endNodeCoords.col])!);
      // setCurrentPathFinder('BFS');
      setTimeTaken(timer);
      shortestPath && setShortestPathLength(shortestPath.length);
      animatePathFinding(visitedNodesInOrder, shortestPath, myRefs);
    }
  };

  /**
   * runs Dijkstra's algorithm and animation
   */
  const runDijkstras = () => {
    if (grid && startNodeCoords && endNodeCoords) {
      const { visitedNodesInOrder, shortestPath, timer, costSoFar } = dijkstras(
        grid,
        startNodeCoords,
        endNodeCoords,
        myRefs
      );
      setTotalMovementCost(costSoFar.get(grid[endNodeCoords.row][endNodeCoords.col])!);
      // setCurrentPathFinder('Ucs');
      setTimeTaken(timer);
      // deduct two since start and end nodes included in the array
      setShortestPathLength(shortestPath.length - 2);
      animatePathFinding(visitedNodesInOrder, shortestPath, myRefs);
    }
  };

  /**
   * determines which algorithm to run based on user selection
   */
  const runAlgo = () => {
    switch (currentPathFinder) {
      case 'Bfs':
        runBfs();
        break;
      case 'Ucs':
        runDijkstras();
        break;
      default:
        break;
    }
  };

  /**
   * clears the graph/grid so algorithm can be run again or a different one
   * @param {object} grid - 2D array of the logical grid nodes in their current state (after algorithm has run)
   * @param {object} myRefs
   */
  const clear = (grid: Node[][], all?: boolean) => {
    for (const row of grid) {
      for (const node of row) {
        node.resetState();
        let domNode = myRefs.current[`node-${node.row}-${node.col}`];
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
    // setCurrentPathFinder(availablePathfinders[0].value);
  };

  return (
    <>
      <Stats
        timeTaken={timeTaken}
        shortestPathLength={shortestPathLength}
        pathFinder={currentPathFinder}
        totalCost={totalMovementCost}
      >
        <Spacer my={5} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => runAlgo()}>Visualize</Button>
          <Button onClick={() => clear(grid!)}>Reset Pathfinder</Button>
          <Button onClick={() => clear(grid!, true)}>Clear All</Button>
        </Box>
      </Stats>
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
        <Spacer my={3} />
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
          <Button onClick={() => setConversionType('start')}>Start </Button>
          <Button onClick={() => setConversionType('end')}>Finish</Button>
          <Button onClick={() => setConversionType('wall')}>Add Walls </Button>
          <Button onClick={() => setConversionType('grass')}>Add Grass</Button>
        </Box>
      </Box>
    </>
  );
};

export default Visualiser;
