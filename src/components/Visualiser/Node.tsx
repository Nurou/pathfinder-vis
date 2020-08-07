import React, { memo } from 'react';
import { NodeWrapper } from '../../styles';

type TNodeProps = {
  row: number;
  col: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  myRefs: any;
};

export const GridNode = memo(
  ({ row, col, onMouseDown, onMouseEnter, onMouseUp, myRefs }: TNodeProps) => {
    console.log('Rendered: Node');
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
const handleRef = (el: HTMLDivElement, row: number, col: number, myRefs: any) => {
  // get existing refs
  let newRefs = { ...myRefs.current };

  // add ref to new element
  newRefs[`node-${row}-${col}`] = el;

  myRefs.current = newRefs;
};
