import React, { memo } from 'react';
import styled from 'styled-components';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';

export const NodeWrapper = styled<any>('td')`
  width: 30px;
  height: 30px;

  background: none;
  border-radius: 4px;
  margin: 2px;
  /* border: 1px solid #f0f0f0; */
`;

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
  gridCellDOMElementRefs: React.MutableRefObject<any>;
};

export const NodeComponent = memo(
  ({ row, col, onMouseDown, onMouseEnter, onMouseUp, gridCellDOMElementRefs }: NodeProps) => {
    useTraceUpdate({ row, col, onMouseDown, onMouseEnter, onMouseUp, gridCellDOMElementRefs });
    return (
      <NodeWrapper
        ref={(el: HTMLButtonElement) => handleRef(el, row, col, gridCellDOMElementRefs)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></NodeWrapper>
    );
  }
);
