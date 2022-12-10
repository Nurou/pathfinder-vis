import React, { memo, useCallback, useEffect } from 'react';
import GridNode from '../../data_structures/Node';
import { NodeComponent } from '../Node';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { coverInTerrain } from './util';
import { Coordinates, CoordToNodeDOMElementMap } from '../../types';

interface GridProps {
  grid: GridNode[][];
  sourceNodeCoords: React.MutableRefObject<Coordinates | null>;
  destinationNodeCoords: React.MutableRefObject<Coordinates | null>;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
  resetCellConversion: () => void;
  handleGridCellConversion: (row: number, col: number) => void;
}

/**
 * Renders the logical nodes as div elements
 */

export const Grid = memo((props: GridProps): JSX.Element => {
  useTraceUpdate(props);

  // setState not used due to avoid unnecessary grid re-renders
  // TODO: move this state up to app since the component
  // is memoized anyway and it's not passed as prop
  let mouseIsPressed = false;

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
    <table className="flex flex-col py-8 self-start">
      <tbody>
        {props.grid.map((row: GridNode[], rowIdx: number) => (
          <tr key={rowIdx} className="flex flex-nowrap">
            {row.map((node: GridNode) => {
              const { row, col } = node;
              return (
                <NodeComponent
                  key={`${row}-${col}`}
                  col={col}
                  row={row}
                  gridCellDOMElementRefs={props.gridCellDOMElementRefs}
                  onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
                  onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                  onClick={props.resetCellConversion}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
