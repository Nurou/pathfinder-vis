import React, { memo, useCallback, useEffect } from 'react';
import GridNode from '../../data_structures/Node';
import { NodeComponent } from '../Node';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { coverInTerrain } from './util';
import { Coordinates, CoordToNodeDOMElementMap, GridCellConversionTypes } from '../../types';

interface GridProps {
  grid: GridNode[][];
  startNodeCoords: React.MutableRefObject<Coordinates | null>;
  endNodeCoords: React.MutableRefObject<Coordinates | null>;
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>;
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
      <caption className="self-start py-6 ">
        <div className="flex flex-col lg:flex-row justify-center items-baseline gap-4">
          <span className="pr-3 font-bold">Click to add to grid:</span>
          <button
            // onClick={() => props.updateGridCellConversionType('start')}
            className="bg-snow0 hover:bg-snow1 text-black  py-2 px-2 rounded mt-4"
          >
            <span className="before:content-['con'] before:text-start  before:inline before:bg-start before:rounded before:mx-3" />
            <span>source</span>
          </button>
          <button
            // onClick={() => props.updateGridCellConversionType('end')}
            className="bg-snow0 hover:bg-snow1 text-black  py-2 px-2 rounded mt-4"
          >
            <span className="before:content-['con'] before:text-end  before:inline before:bg-end before:rounded before:mx-3" />
            <span>destination</span>
          </button>
          <button
            // onClick={() => props.updateGridCellConversionType('wall')}
            className="bg-snow0 hover:bg-snow1 text-black  py-2 px-2 rounded mt-4"
          >
            <span className="before:content-['con'] before:text-polar1  before:inline before:bg-polar1 before:rounded before:mx-3" />
            <span>wall</span>
          </button>
          <button
            // onClick={() => props.updateGridCellConversionType('grass')}
            className="bg-snow0 hover:bg-snow1 text-black  py-2 px-2 rounded mt-4"
          >
            <span className="before:content-['con'] before:text-grass  before:inline before:bg-grass before:rounded before:mx-3" />
            <span>grass</span>
          </button>
        </div>
      </caption>
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
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
