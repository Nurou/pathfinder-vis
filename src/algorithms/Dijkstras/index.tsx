import { ICoordinates } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall, getMovementCost } from '../util';
import Node from '../../data_structures/Node';
import { CustomMap } from '../../data_structures/Map';

/**
 *  An implementation of Dijkstra's algorithm for path finding that accounts for the movement costs of nodes
 *
 * @param {array} grid holds logical nodes
 * @param {object} startNodeCoords
 * @param {object} endNodeCoords
 * @param
 */
export const dijkstras = (
  grid: Node[][],
  startNodeCoords: ICoordinates,
  endNodeCoords: ICoordinates,
  myRefs: React.MutableRefObject<any>
) => {
  checkArgs(grid, startNodeCoords, endNodeCoords);

  const visitedNodesInOrder: Node[] = [];

  // get logical start and end nodes by coordinates
  const startNode: Node = grid[startNodeCoords.row][startNodeCoords.col];
  const endNode: Node = grid[endNodeCoords.row][endNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  const frontier = new PriorityQueue((a, b) => a[1] < b[1]);
  frontier.push([startNode, 0]);
  console.log('\nInitial contents:');
  console.log(frontier.peek()[0]); //=>

  const cameFrom = new CustomMap<Node, Node | null>();
  cameFrom.put(startNode, null);

  // keeps track of total movement cost from the start node to all nodes
  // same node can be visited multiple times with different costs
  const costSoFar = new CustomMap<Node, number>();
  costSoFar.put(startNode, 0);

  // keep on checking the queue until it's empty
  while (frontier && frontier.size()) {
    // pop queue
    const current: Node | undefined = frontier.pop()[0];

    // early exit conditional
    if (current === endNode) {
      break;
    }

    if (current?.neighbors) {
      for (let index = 0; index < current.neighbors.length; index++) {
        const neighbor = current.neighbors[index];
        // skip walls
        if (isWall(neighbor, myRefs)) continue;
        const newCost = costSoFar.get(current)! + getMovementCost(neighbor, myRefs);
        // no cost associated with neighbor or better cost?
        if (!costSoFar.has(neighbor) || newCost < costSoFar.get(neighbor)!) {
          // update cost
          costSoFar.put(neighbor, newCost);
          const priority = newCost;

          let currentLength = visitedNodesInOrder.length;
          visitedNodesInOrder[currentLength] = neighbor;
          currentLength++;
          visitedNodesInOrder.length = currentLength;
          frontier.push([neighbor, priority]);
          cameFrom.put(neighbor, current);
        }
      }
    }
  }

  console.log("Dijkstra's Complete!");
  timer += performance.now();
  console.log('Time: ' + (timer / 1000).toFixed(5) + ' sec.');

  const shortestPath = reconstructPath(startNode, endNode, cameFrom);

  return {
    visitedNodesInOrder,
    shortestPath,
    timer,
    costSoFar
  };
};
