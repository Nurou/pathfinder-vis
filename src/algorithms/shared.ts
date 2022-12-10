import { CustomMap } from '../data_structures/Map/index';
import { Coordinates, CoordToNodeDOMElementMap } from '../types';
import { GridNode } from '../data_structures/Node';
import React from 'react';

export type MockRefs = {
  current: { [key: string]: HTMLTableCellElement };
};

type ArgsTuple = [
  grid: GridNode[][],
  sourceNodeCoords: Coordinates,
  destinationNodeCoords: Coordinates,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
];

export const checkArgs = (...args: ArgsTuple) => {
  const [grid, sourceNodeCoords, destinationNodeCoords, gridCellDOMElementRefs] = args;
  if (!grid || !sourceNodeCoords || !destinationNodeCoords || !gridCellDOMElementRefs) {
    throw new Error('Missing arguments!');
  }

  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const MIN_ROW = 0;
  const MIN_COL = 0;

  const between = (x: number, min: number, max: number) => {
    return x >= min && x <= max;
  };

  if (
    !between(sourceNodeCoords.row, MIN_ROW, MAX_ROW) ||
    !between(sourceNodeCoords.col, MIN_COL, MAX_COL) ||
    !between(destinationNodeCoords.row, MIN_ROW, MAX_ROW) ||
    !between(destinationNodeCoords.col, MIN_COL, MAX_COL)
  ) {
    throw new Error('Coordinates out of bounds!');
  }
};

/**
 * Reconstructs the path from end node to start node if it exists
 */
export const reconstructPath = (
  sourceNode: GridNode,
  destinationNode: GridNode,
  cameFrom: CustomMap<GridNode, GridNode | null>
) => {
  // path starts out empty
  const path: GridNode[] = [];

  // end node was reached
  if (cameFrom?.get(destinationNode) !== undefined) {
    // start from goal
    let current = destinationNode;

    // ends when start reached
    while (current !== sourceNode) {
      path.push(current);
      if (current) {
        current = cameFrom!.get(current)!;
      }
    }

    // include start node for visualisation
    path.push(sourceNode);
  }

  return path;
};

export const isSourceNode = (
  row: number,
  col: number,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): boolean => {
  const nodeClassList: DOMTokenList | undefined =
    gridCellDOMElementRefs.current?.[`node-${row}-${col}`].classList;
  return !!nodeClassList?.contains('source');
};

export const isDestinationNode = (
  row: number,
  col: number,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): boolean => {
  const nodeClassList = gridCellDOMElementRefs.current?.[`node-${row}-${col}`].classList;
  return !!nodeClassList?.contains('destination');
};

export const isGrass = (
  row: number,
  col: number,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): boolean => {
  const nodeClassList = gridCellDOMElementRefs.current?.[`node-${row}-${col}`].classList;
  return !!nodeClassList?.contains('grass');
};

/**
 *
 * @param node - for coordinates
 * @param gridCellDOMElementRefs
 */

export const isWall = (
  node: GridNode,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): boolean => {
  const nodeClassList = gridCellDOMElementRefs.current?.[`node-${node.row}-${node.col}`].classList;

  return !!nodeClassList?.contains('wall');
};

/**
 * returns the cost of traversing the potential neighbor
 * @param node
 * @param gridCellDOMElementRefs
 */
export const getMovementCost = (
  node: GridNode,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): number => {
  const GRASS_COST = 5;
  const TERRAIN_COST = 1;

  const nodeClassList = gridCellDOMElementRefs.current?.[`node-${node.row}-${node.col}`].classList;

  return nodeClassList?.contains('grass') ? GRASS_COST : TERRAIN_COST;
};

/**
 * Calculates Manhattan distance between two nodes on a square grid
 * @param a
 * @param b
 */
export const heuristic = (a: GridNode, b: GridNode): number => {
  let xDist = a.col - b.col;
  let yDist = a.row - b.row;

  // equivalent to abs function
  xDist = xDist > 0 ? xDist : -xDist;
  yDist = yDist > 0 ? yDist : -yDist;

  return xDist + yDist;
};
