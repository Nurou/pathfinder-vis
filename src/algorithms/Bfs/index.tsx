import { Node } from '../../data_structures/Node';
import { reconstructPath, checkArgs, isWall, getMovementCost } from '../util';
import { ICoordinates } from '../../types';

/* logical implementation of BFS
 */

/**
 *  A simple breadth-first search implementation
 * @param {array} grid grid holding all the logical nodes
 * @param {object} startNodeCoords
 * @param {object} endNodeCoords
 */
export const bfs = (
  grid: Node[][],
  startNodeCoords: ICoordinates,
  endNodeCoords: ICoordinates,
  myRefs?: React.MutableRefObject<any> | object
) => {
  checkArgs(grid, startNodeCoords, endNodeCoords);

  // uses to animating flood/frontier
  let visitedNodesInOrder: Node[] = [];

  // get logical start and end nodes by coordinates
  let startNode: Node = grid[startNodeCoords.row][startNodeCoords.col];
  let endNode: Node = grid[endNodeCoords.row][endNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  // queue for traversing the grid
  let frontier: Node[] = [];
  frontier.push(startNode);

  // map preceding node to each node.
  let cameFrom = new Map<Node, Node>();
  cameFrom.set(startNode, null!);

  let costSoFar = new Map<Node, number>();
  costSoFar.set(startNode, 0);

  // keep on checking the queue until it's empty
  while (frontier && frontier.length) {
    // pop queue
    let current: Node | undefined = frontier.shift();
    // early exit conditional
    if (current === endNode) {
      break;
    }

    if (current?.neighbors) {
      for (let index = 0; index < current.neighbors.length; index++) {
        const neighbor = current.neighbors[index];
        if (!cameFrom.get(neighbor) && !isWall(neighbor, myRefs)) {
          // movement costs not accounted for by Bfs - tracked for comparison purposes
          let newCost = costSoFar.get(current)! + getMovementCost(neighbor, myRefs);
          costSoFar.set(neighbor, newCost);

          let currentLength = visitedNodesInOrder.length;
          visitedNodesInOrder[currentLength] = neighbor;
          currentLength++;
          visitedNodesInOrder.length = currentLength;
          // visitedNodesInOrder.push(neighbor);
          frontier.push(neighbor);

          cameFrom.set(neighbor, current);
        }
      }
    }
  }

  console.log('BFS Complete!');
  timer += performance.now();
  console.log('Time: ' + (timer / 1000).toFixed(5) + ' sec.');

  let shortestPath = reconstructPath(startNode, endNode, cameFrom);

  return {
    visitedNodesInOrder,
    shortestPath,
    timer,
    costSoFar
  };
};