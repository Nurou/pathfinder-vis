import React from 'react';
import Node from '../../data_structures/Node';
import { Grid, GridRow } from './styles';
import { GridNode } from './Node';

interface IGridProps {
  grid: Node[][];
  myRefs: React.MutableRefObject<any>;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseUp: () => void;
}

/**
 * Renders the logical nodes as div elements
 */
export const GridGraph = (props: IGridProps): JSX.Element => {
  return (
    <Grid>
      {props.grid.map((row, rowIdx) => (
        <GridRow key={rowIdx} columns={props.grid[0].length}>
          {row.map((node: Node) => {
            const { row, col } = node;
            return (
              <GridNode
                key={`${row}-${col}`}
                col={col}
                row={row}
                myRefs={props.myRefs}
                onMouseEnter={(row, col) => props.handleMouseEnter(row, col)}
                onMouseDown={(row, col) => props.handleMouseDown(row, col)}
                onMouseUp={() => props.handleMouseUp()}
              />
            );
          })}
        </GridRow>
      ))}
    </Grid>
  );
};
