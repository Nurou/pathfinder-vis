import React, { useState, useRef, useLayoutEffect } from 'react';
import Node from '../data_structures/Node';
import { Box, Spacer } from './Shared';
import { Button, Grid, GridRow } from '../styles';
import { GridNode } from './Node';
import { Coordinates } from '../types';

const Visualiser = () => {
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

  // init grid on render
  useLayoutEffect(() => {
    // grid dimensions
    const GRID_ROWS: number = 10;
    const GRID_COLS: number = 30;

    let grid: Node[][] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        // add a node for each row column
        let newNode = new Node(row, col);
        console.log({ newNode });
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

  /**
   * Converts a node into wall or grass type by modifying
   * the actual node object stored in the grid
   * @param {number} row
   * @param {number} col
   */
  const convertToType = (row: number, col: number) => {
    // target node
    let domNode = myRefs.current[`node-${row}-${col}`];
    // no longer regular
    domNode.classList.remove('regular');

    if (conversionType === 'start') {
      // if start node already set, move it
      if (startNodeCoords) {
        // get current start node and remove class
        myRefs.current[
          `node-${startNodeCoords.row}-${startNodeCoords.col}`
        ].classList.remove('start');
        // add new coordinates
        setStartNodeCoords({ row: row, col: col });
        domNode.classList.add('start');
      } else {
        setStartNodeCoords({ row: row, col: col });
        domNode.classList.add('start');
      }

      console.log(domNode.classList);

      return;
    }
  };

  /**
   * register neighbors for each node
   * @param {Node[][]} grid
   */
  const setNodeNeighbors = (grid: Node[][]) => {
    for (const row of grid) {
      for (const node of row) {
        node.setNeighbors(grid);
      }
    }
  };

  /**
   * mousedown is fired the moment the button is initially pressed.
   * @param {number} row
   * @param {number} col
   */
  const handleMouseDown = (row: number, col: number): void => {
    mouseIsPressed = true;
    convertToType(row, col);
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
      convertToType(row, col);
    }
  };

  return (
    <>
      <Box
        as='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
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
        <pre>
          {JSON.stringify(startNodeCoords)}
          <br />
          {JSON.stringify(endNodeCoords)}
        </pre>
      </Box>
    </>
  );
};

export default Visualiser;
