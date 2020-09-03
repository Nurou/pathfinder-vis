import { ICoordinates } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall, getMovementCost, heuristic } from '../util';
import Node from '../../data_structures/Node';
import { CustomMap } from '../../data_structures/Map';

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

  let cameFrom = new CustomMap<Node, Node | null>();
  cameFrom.put(startNode, null);

  // cost tracked comparison purposes only - does not affect heuristic
  let costSoFar = new CustomMap<Node, number>();
  costSoFar.put(startNode, 0);

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

        let currentLength = visitedNodesInOrder.length;
        visitedNodesInOrder[currentLength] = neighbor;
        currentLength++;
        visitedNodesInOrder.length = currentLength;

        let priority = heuristic(endNode, neighbor);
        frontier.push([neighbor, priority]);
        cameFrom.put(neighbor, current);

        // movement costs not accounted for by Bfs - tracked for comparison purposes
        let newCost = costSoFar.get(current)! + getMovementCost(neighbor, myRefs);
        costSoFar.put(neighbor, newCost);
      }
    }
  }

  console.log('Greedy Bfs Complete!');
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
