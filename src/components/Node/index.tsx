import React, { memo } from 'react';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { CoordToNodeDOMElementMap } from '../../types';

/**
 *
 * @param {HTMLButtonElement} el - DOM element representing node
 * @param {number} row - row index of node
 * @param {number} col - column index of node
 */
const handleRef = (
  el: HTMLButtonElement,
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
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
};

export const NodeComponent = memo(
  ({ row, col, onMouseDown, onMouseEnter, onMouseUp, gridCellDOMElementRefs }: NodeProps) => {
    useTraceUpdate({ row, col, onMouseDown, onMouseEnter, onMouseUp, gridCellDOMElementRefs });
    return (
      <td
        className="w-8 h-8 bg-none rounded m-1"
        role="cell"
        ref={(el: HTMLButtonElement) => handleRef(el, row, col, gridCellDOMElementRefs)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></td>
    );
  }
);
