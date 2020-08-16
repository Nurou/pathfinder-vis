import { ICoordinates } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall, getMovementCost } from '../util';
import Node from '../../data_structures/Node';

/**
 *  An implementation of Dijkstra's algorithm for path finding that accounts for the movement costs of nodes
 *
 * @param {array} grid grid holding all the logical nodes
 * @param {object} startNodeCoords
 * @param {object} endNodeCoords
 */
export const dijkstras = (
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
  console.log('\nInitial contents:');
  console.log(frontier.peek()[0]); //=>

  let cameFrom = new Map<Node, Node>();
  cameFrom.set(startNode, null!);

  // keeps track of total movement cost from the start node to all nodes
  // same node can be visited multiple times with different costs
  let costSoFar = new Map<Node, number>();
  costSoFar.set(startNode, 0);

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
        // skip walls
        if (isWall(neighbor, myRefs)) continue;
        let newCost = costSoFar.get(current)! + getMovementCost(neighbor, myRefs);
        // no cost associated with neighbor or better cost?
        if (!costSoFar.has(neighbor) || newCost < costSoFar.get(neighbor)!) {
          // update cost
          costSoFar.set(neighbor, newCost);
          let priority = newCost;
          visitedNodesInOrder.push(neighbor);
          frontier.push([neighbor, priority]);
          cameFrom.set(neighbor, current);
        }
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
    timer,
    costSoFar
  };
};
