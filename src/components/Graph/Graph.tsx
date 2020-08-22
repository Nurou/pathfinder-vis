import React, { memo, useEffect } from 'react';
import Node from '../../data_structures/Node';
import { Grid, GridRow } from './styles';
import { GridNode } from '../Node';
import { useTraceUpdate } from '../../hooks/useTraceUpdate';
import { convertToType, coverInTerrain } from '../util';
import { ICoordinates } from '../../types';

interface IGridProps {
  grid: Node[][];
  conversionType: string;
  setStartNodeCoords: React.Dispatch<React.SetStateAction<ICoordinates | null>>;
  setEndNodeCoords: React.Dispatch<React.SetStateAction<ICoordinates | null>>;
  startNodeCoords: ICoordinates | null;
  endNodeCoords: ICoordinates | null;
  myRefs?: React.MutableRefObject<any>;
}

/**
 * Renders the logical nodes as div elements
 */

export const Graph = memo(
  (props: IGridProps): JSX.Element => {
    useTraceUpdate(props);

    // setState not used due to avoid unnecessary grid re-renders
    let mouseIsPressed = false;

    // runs  after render and useEffects above
    useEffect(() => {
      props.myRefs && coverInTerrain(props.myRefs);
    });

    /**
     * mousedown is fired the moment the button is initially pressed
     * @param {number} row
     * @param {number} col
     */
    const handleMouseDown = (row: number, col: number): void => {
      mouseIsPressed = true;
      handleConversion(row, col);
    };

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
    const handleMouseEnter = (row: number, col: number) => {
      if (mouseIsPressed) {
        handleConversion(row, col);
      }
    };

    const handleConversion = (row: number, col: number) => {
      convertToType(
        row,
        col,
        props.conversionType,
        props.startNodeCoords,
        props.endNodeCoords,
        props.setStartNodeCoords,
        props.setEndNodeCoords,
        props.myRefs
      );
    };

    return (
      <Grid>
        {props.grid.map((row: Node[], rowIdx: number) => (
          <GridRow key={rowIdx} columns={props.grid[0].length}>
            {row.map((node: Node) => {
              const { row, col } = node;
              return (
                <GridNode
                  key={`${row}-${col}`}
                  col={col}
                  row={row}
                  myRefs={props.myRefs!}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </GridRow>
        ))}
      </Grid>
    );
  }
);
