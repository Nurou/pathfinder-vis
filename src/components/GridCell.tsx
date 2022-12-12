import React, { memo } from 'react';
// import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { CoordToNodeDOMElementMap } from '../types';

/**
 *
 * @param {HTMLTableCellElement} el - DOM element representing node
 * @param {number} row - row index of node
 * @param {number} col - column index of node
 */
const handleRef = (
  el: HTMLTableCellElement,
  row: number,
  col: number,
  gridCellDOMElementRefs: React.MutableRefObject<any>
) => {
  const nextRefs = { ...gridCellDOMElementRefs.current };

  nextRefs[`node-${row}-${col}`] = el;

  gridCellDOMElementRefs.current = nextRefs;
};

type NodeProps = {
  row: number;
  col: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  resetCellConversion: () => void;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
};

export const GridCell = memo(
  ({
    row,
    col,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    resetCellConversion,
    gridCellDOMElementRefs
  }: NodeProps) => {
    // useTraceUpdate({
    //   row,
    //   col,
    //   onMouseDown,
    //   onMouseEnter,
    //   onMouseUp,
    //   onClick,
    //   gridCellDOMElementRefs
    // });
    return (
      <td
        role="gridcell"
        tabIndex={0}
        className="flex justify-center items-center w-8 h-8 bg-none rounded m-[2px]"
        ref={(el: HTMLTableCellElement) => handleRef(el, row, col, gridCellDOMElementRefs)}
        onMouseDown={(e) => onMouseDown(row, col)}
        onMouseEnter={(e) => onMouseEnter(row, col)}
        onMouseUp={(e) => onMouseUp()}
        onClick={resetCellConversion}
        onFocus={(e) => onMouseEnter(row, col)}
      ></td>
    );
  }
);
