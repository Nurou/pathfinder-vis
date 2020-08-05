import { Coordinates } from './../../types/index.d';
import { Node } from './../../data_structures/Node';

/**
 *
 * @param grid
 * @param startNodeCoords
 * @param endNodeCoords
 */
export const checkArgs = (
  grid: Node[][],
  startNodeCoords: Coordinates,
  endNodeCoords: Coordinates
) => {
  if (!grid || !startNodeCoords || !endNodeCoords) {
    throw new Error('Missing arguments!');
  }

  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const MIN_ROW = 0;
  const MIN_COL = 0;

  if (
    !between(startNodeCoords.row, MIN_ROW, MAX_ROW) ||
    !between(startNodeCoords.col, MIN_COL, MAX_COL) ||
    !between(endNodeCoords.row, MIN_ROW, MAX_ROW) ||
    !between(endNodeCoords.col, MIN_COL, MAX_COL)
  ) {
    throw new Error('Coordinates out of bounds!');
  }
};

const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

/**
 *
 * @param {number} startNode
 * @param {number} endNode
 */
export const reconstructPath = (startNode: Node, endNode: Node, cameFrom?: Map<Node, Node>) => {
  // start from goal
  let current = endNode;
  // path starts out empty
  let path: Node[] = [];
  // ends when start reached
  while (current !== startNode) {
    path.push(current);
    if (current) {
      current = cameFrom!.get(current)!;
    }
  }

  // include start node for visualisation
  path.push(startNode);

  return path;
};

/**
 *
 * @param node - for coordinates
 * @param myRefs
 */

export const isWall = (node: Node, myRefs: any) => {
  // for test/mocking purpose
  if (myRefs!.current[`node-${node.row}-${node.col}`].classList.length === 0) {
    return false;
  }
  // proper check
  return myRefs!.current[`node-${node.row}-${node.col}`].classList.contains('wall');
};
