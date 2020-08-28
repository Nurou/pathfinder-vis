import React, { memo } from 'react';
import { NodeWrapper } from './styles';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';

type TNodeProps = {
  row: number;
  col: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  myRefs: React.MutableRefObject<any>;
};

export const GridNode = memo(
  ({ row, col, onMouseDown, onMouseEnter, onMouseUp, myRefs }: TNodeProps) => {
    useTraceUpdate({ row, col, onMouseDown, onMouseEnter, onMouseUp, myRefs });
    console.log('Rendered: NODE ');
    return (
      <NodeWrapper
        ref={(el: HTMLDivElement) => handleRef(el, row, col, myRefs)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      />
    );
  }
);

interface HTMLDivElement {
  type: string;
}

/**
 *
 * @param {HTMLDivElement} el - DOM element representing node
 * @param {number} row
 * @param {number} col
 */
const handleRef = (
  el: HTMLDivElement,
  row: number,
  col: number,
  myRefs: React.MutableRefObject<any>
) => {
  // get existing refs
  let newRefs = { ...myRefs.current };

  // add ref to new element
  newRefs[`node-${row}-${col}`] = el;

  myRefs.current = newRefs;
};
