import React, { memo } from 'react';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { CoordToNodeDOMElementMap } from '../../types';

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
  // get existing refs
  const newRefs = { ...gridCellDOMElementRefs.current };

  // add ref to new element
  newRefs[`node-${row}-${col}`] = el;

  gridCellDOMElementRefs.current = newRefs;
};

type NodeProps = {
  row: number;
  col: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  onClick: () => void;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
};

export const NodeComponent = memo(
  ({
    row,
    col,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onClick,
    gridCellDOMElementRefs
  }: NodeProps) => {
    useTraceUpdate({
      row,
      col,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onClick,
      gridCellDOMElementRefs
    });
    return (
      <td
        className="w-8 h-8 bg-none rounded m-1"
        role="cell"
        ref={(el: HTMLTableCellElement) => handleRef(el, row, col, gridCellDOMElementRefs)}
        onMouseDown={(e) => onMouseDown(row, col)}
        onMouseEnter={(e) => onMouseEnter(row, col)}
        onMouseUp={(e) => onMouseUp()}
        onClick={onClick}
      ></td>
    );
  }
);
