import { ICoordinates } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall } from '../util';
import Node from '../../data_structures/Node';

/**
 *  An implementation of the Greedy Best-Fist Search, which uses a heuristic function to approximate the goal
 *
 * @param {array} grid grid holding all the logical nodes
 * @param {object} startNodeCoords
 * @param {object} endNodeCoords
 */
export const gbfs = (
  grid: Node[][],
  startNodeCoords: ICoordinates,
  endNodeCoords: ICoordinates,
  myRefs: any
) => {
  checkArgs(grid, startNodeCoords, endNodeCoords);

  let visitedNodesInOrder: Node[] = [];

  // get logical start and end nodes by coordinates
  let startNode: Node = grid[startNodeCoords.row][startNodeCoords.col];
  let endNode: Node = grid[endNodeCoords.row][endNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  let frontier = new PriorityQueue((a, b) => a[1] < b[1]);
  frontier.push([startNode, 0]);

  let cameFrom = new Map<Node, Node>();
  cameFrom.set(startNode, null!);

  // keep on checking the queue until it's empty
  while (frontier && frontier.size()) {
    // pop queue
    let current: Node | undefined = frontier.pop()[0];

    // early exit conditional
    if (current === endNode) {
      break;
    }

    if (current?.neighbors) {
      for (const neighbor of current.neighbors) {
        // neighbor can be visited once only
        if (isWall(neighbor, myRefs) || cameFrom.get(neighbor)) continue;

        visitedNodesInOrder.push(neighbor);
        let priority = heuristic(endNode, neighbor);
        frontier.push([neighbor, priority]);
        cameFrom.set(neighbor, current);
      }
    }
  }

  console.log("Dijkstra's Complete!");
  timer += performance.now();
  console.log('Time: ' + (timer / 1000).toFixed(5) + ' sec.');

  let shortestPath = reconstructPath(startNode, endNode, cameFrom);

  return {
    visitedNodesInOrder,
    shortestPath,
    timer
  };
};

/**
 * Calculates Manhattan distance between two nodes on a square grid
 * @param a
 * @param b
 */
const heuristic = (a: Node, b: Node): number => {
  let xDist = a.row - b.row;
  let yDist = a.col - b.col;
  // equivalent to abs function
  xDist = xDist > 0 ? xDist : -xDist;
  yDist = yDist > 0 ? yDist : -yDist;
  return xDist + yDist;
};
