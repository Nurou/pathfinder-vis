import React, { memo, useCallback, useEffect } from 'react';
import GridNode from '../../data_structures/Node';
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
    <table className="flex flex-col py-8 self-start">
      <caption className="self-start py-6 ">
        <div className="flex flex-col lg:flex-row justify-center items-baseline gap-4">
          <span className="pr-3">Click to add to grid:</span>
          <button className="bg-snow0 hover:bg-snow1 text-black font-bold py-2 px-2 rounded mt-4">
            <span className="before:content-['con'] before:text-start  before:inline before:bg-start before:rounded before:mx-3" />
            <span>source</span>
          </button>
          <button className="bg-snow0 hover:bg-snow1 text-black font-bold py-2 px-2 rounded mt-4">
            <span className="before:content-['con'] before:text-end  before:inline before:bg-end before:rounded before:mx-3" />
            <span>destination</span>
          </button>
          <button className="bg-snow0 hover:bg-snow1 text-black font-bold py-2 px-2 rounded mt-4">
            <span className="before:content-['con'] before:text-polar1  before:inline before:bg-polar1 before:rounded before:mx-3" />
            <span>wall</span>
          </button>
          <button className="bg-snow0 hover:bg-snow1 text-black font-bold py-2 px-2 rounded mt-4">
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
