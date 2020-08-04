import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Node from '../../data_structures/Node';
import { Box, Spacer } from '.././Shared';
import { Button, Grid, GridRow } from '../../styles';
import { GridNode } from '.././Node';
import { Coordinates } from '../../types';
import { bfs } from '../../algorithms/BFS';
import Stats from '.././Stats';
import { animateBfs } from '.././animate';
import { convertToType, coverInTerrain, setNodeNeighbors } from './util';

const Visualiser = () => {
  console.log('Rendered: Visualiser');

  const [grid, setGrid] = useState<Node[][] | null>([]);

  const [startNodeCoords, setStartNodeCoords] = useState<Coordinates | null>(
    null
  );
  const [endNodeCoords, setEndNodeCoords] = useState<Coordinates | null>(null);

  // what the node will be converted to
  const [conversionType, setConversionType] = useState('start');

  // globals - setState not used due to avoid re-rendering
  let mouseIsPressed = false;
  let myRefs: React.MutableRefObject<any> = useRef({});

  /* Stats State */

  const availablePathfinders = [{ value: 'Bfs', label: 'Bfs' }];

  const [currentPathFinder, setCurrentPathFinder] = useState<string | null>(
    availablePathfinders[0].value
  );

  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [shortestPathLength, setShortestPathLength] = useState<number | null>(
    null
  );

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
    // neighbors can be set once grid has been filled
    setNodeNeighbors(grid);
  }, []);

  // runs last
  useEffect(() => {
    coverInTerrain(myRefs);
  });

  /**
   * mousedown is fired the moment the button is initially pressed.
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
   *   fired when a button on a pointing device is released while the pointer is located inside it - counterpoint to mousedown
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
      const { visitedNodesInOrder, shortestPath, timer } = bfs(
        grid,
        startNodeCoords,
        endNodeCoords,
        myRefs
      );
      setCurrentPathFinder('BFS');
      setTimeTaken(timer);
      shortestPath && setShortestPathLength(shortestPath.length);
      animateBfs(visitedNodesInOrder, shortestPath, myRefs);
    }
  };

  const visualiseAlgo = () => {
    switch (currentPathFinder) {
      case 'Bfs':
        runBfs();
        break;

      default:
        break;
    }
  };

  /**
   * algorithm can be run again or a different one run instead
   */
  /**
   *
   * @param {object} grid - 2D array of the logical grid nodes in their current state (after algorithm has run)
   * @param {object} myRefs
   */
  const clear = (grid: Node[][], all?: boolean) => {
    for (const row of grid) {
      for (const node of row) {
        node.resetState();
        let domNode = myRefs.current[`node-${node.row}-${node.col}`];
        domNode.classList.remove(
          'node-visited',
          'node-shortest-path',
          'wall',
          'grass'
        );
      }
    }
    // clear stats
    setShortestPathLength(null);
    setTimeTaken(null);
    setCurrentPathFinder(availablePathfinders[0].value);
  };

  return (
    <>
      <Stats
        timeTaken={timeTaken}
        shortestPathLength={shortestPathLength}
        pathFinder={currentPathFinder}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => visualiseAlgo()}>Visualize</Button>
          <Button onClick={() => clear(grid!)}>Reset Pathfinder</Button>
          <Button onClick={() => clear(grid!)}>Clear All</Button>
        </Box>
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
      </Stats>
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={4}
      >
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
          {/* TODO: consider if state update necessary  */}
          <Button onClick={() => setConversionType('start')}>Start </Button>
          <Button onClick={() => setConversionType('end')}>Finish</Button>
          <Button onClick={() => setConversionType('wall')}>Add Walls </Button>
          <Button onClick={() => setConversionType('grass')}>Add Grass</Button>
          <Button onClick={coverInTerrain}>Init</Button>
        </Box>
      </Box>
    </>
  );
};

export default Visualiser;
