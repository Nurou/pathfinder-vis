import React, { memo, useCallback, useEffect } from 'react';
import Node from '../../data_structures/Node';
import { TableGrid, GridRow } from './styles';
import { GridNode } from '../Node';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { coverInTerrain, convertToType } from './util';

interface IGridProps {
  grid: Node[][];
  conversionType: any;
  startNodeCoords: any;
  endNodeCoords: any;
  myRefs: React.MutableRefObject<any>;
}

/**
 * Renders the logical nodes as div elements
 */

export const Graph = memo((props: IGridProps): JSX.Element => {
  useTraceUpdate(props);

  // setState not used due to avoid unnecessary grid re-renders
  let mouseIsPressed = false;

  useEffect(() => {
    props.myRefs && coverInTerrain(props.myRefs);
  }, []);

  const handleConversion = useCallback((row: number, col: number) => {
    convertToType(
      row,
      col,
      props.conversionType,
      props.startNodeCoords,
      props.endNodeCoords,
      props.myRefs!
    );
  }, []);

  /**
   * mousedown is fired the moment the button is initially pressed
   * @param {number} row
   * @param {number} col
   */
  const handleMouseDown = useCallback((row: number, col: number): void => {
    mouseIsPressed = true;
    handleConversion(row, col);
  }, []);

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
  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (mouseIsPressed) {
      handleConversion(row, col);
    }
  }, []);

  return (
    <TableGrid>
      <tbody>
        {props.grid.map((row: Node[], rowIdx: number) => (
          <GridRow key={rowIdx} columns={props.grid[0].length}>
            {row.map((node: Node) => {
              const { row, col } = node;
              return (
                <GridNode
                  key={`${row}-${col}`}
                  col={col}
                  row={row}
                  myRefs={props.myRefs}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </GridRow>
        ))}
      </tbody>
    </TableGrid>
  );
});
