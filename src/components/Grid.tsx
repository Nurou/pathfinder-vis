import React, { memo, useCallback, useEffect } from 'react';
import GridNode from '../data_structures/Node';
import { GridCell } from './GridCell';
// import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { coverInTerrain } from '../util';
import { Coordinates, CoordToNodeDOMElementMap } from '../types';

interface GridProps {
  grid: GridNode[][];
  sourceNodeCoords: React.MutableRefObject<Coordinates | null>;
  destinationNodeCoords: React.MutableRefObject<Coordinates | null>;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
  resetCellConversion: () => void;
  handleGridCellConversion: (row: number, col: number) => void;
  tableRef: React.RefObject<HTMLTableElement>;
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>, enterKeyCb: () => void) => {
  const currentCell = event.target as HTMLTableCellElement;
  const table = currentCell.offsetParent as HTMLTableElement | null;
  const currentCellParentRow = currentCell.parentNode as HTMLTableRowElement | null;

  if (!currentCell || !table || !currentCellParentRow) return;

  let cellToFocus: HTMLTableCellElement | null = null;

  if (event.code == 'ArrowLeft') {
    cellToFocus = table.rows[currentCellParentRow?.rowIndex].cells[currentCell.cellIndex - 1];
    cellToFocus?.focus();
  } else if (event.code == 'ArrowRight') {
    cellToFocus = table.rows[currentCellParentRow?.rowIndex].cells[currentCell.cellIndex + 1];
    cellToFocus?.focus();
  } else if (event.code == 'ArrowUp') {
    cellToFocus = table.rows[currentCellParentRow?.rowIndex - 1].cells[currentCell.cellIndex];
    cellToFocus?.focus();
  } else if (event.code == 'ArrowDown') {
    cellToFocus = table.rows[currentCellParentRow?.rowIndex + 1].cells[currentCell.cellIndex];
    cellToFocus?.focus();
  } else if (event.code == 'Escape') {
    currentCell.blur();
  } else if (event.code == 'Enter') {
    enterKeyCb();
  }
};

/**
 * Renders the logical nodes as HTML elements
 */
export const Grid = memo((props: GridProps): JSX.Element => {
  // useTraceUpdate(props);
  let mouseIsPressed = true;

  useEffect(() => {
    props.gridCellDOMElementRefs && coverInTerrain(props.gridCellDOMElementRefs);
  }, []);

  /**
   * mousedown is fired the moment the button is initially pressed
   * @param {number} row
   * @param {number} col
   */
  const handleMouseDown = useCallback((row: number, col: number): void => {
    mouseIsPressed = true;
    props.handleGridCellConversion(row, col);
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
      props.handleGridCellConversion(row, col);
    }
  }, []);

  return (
    <table
      ref={props.tableRef}
      className="flex flex-col self-start"
      onKeyDown={(event) => handleKeyDown(event, props.resetCellConversion)}
    >
      <tbody>
        {props.grid.map((row: GridNode[], rowIdx: number) => (
          <tr key={rowIdx} className="flex flex-nowrap">
            {row.map((node: GridNode) => {
              const { row, col } = node;
              return (
                <GridCell
                  key={`${row}-${col}`}
                  col={col}
                  row={row}
                  gridCellDOMElementRefs={props.gridCellDOMElementRefs}
                  onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
                  onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                  resetCellConversion={props.resetCellConversion}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
