import React, { memo, useCallback, useEffect } from 'react';
import GridNode from '../../data_structures/Node';
import { TableGrid, GridRow } from './styles';
import { NodeComponent } from '../Node';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { coverInTerrain, convertToType } from './util';

interface GridProps {
  grid: GridNode[][];
  conversionType: any;
  startNodeCoords: any;
  endNodeCoords: any;
  gridCellDOMElementRefs: React.MutableRefObject<any>;
}

/**
 * Renders the logical nodes as div elements
 */

export const Graph = memo((props: GridProps): JSX.Element => {
  useTraceUpdate(props);

  // setState not used due to avoid unnecessary grid re-renders
  let mouseIsPressed = false;

  useEffect(() => {
    props.gridCellDOMElementRefs && coverInTerrain(props.gridCellDOMElementRefs);
  }, []);

  const handleConversion = useCallback((row: number, col: number) => {
    convertToType(
      row,
      col,
      props.conversionType,
      props.startNodeCoords,
      props.endNodeCoords,
      props.gridCellDOMElementRefs!
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
        {props.grid.map((row: GridNode[], rowIdx: number) => (
          <GridRow key={rowIdx} columns={props.grid[0].length}>
            {row.map((node: GridNode) => {
              const { row, col } = node;
              return (
                <NodeComponent
                  key={`${row}-${col}`}
                  col={col}
                  row={row}
                  gridCellDOMElementRefs={props.gridCellDOMElementRefs}
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
