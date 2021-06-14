import { Node } from '../../data_structures/Node';
import { reconstructPath, checkArgs, isWall, getMovementCost } from '../util';
import { ICoordinates } from '../../types';
import { CustomMap } from '../../data_structures/Map';

/* logical implementation of BFS
 */

const pushToFrontier = (frontier: Node[], node: Node) => {
  let currentLength = frontier.length;
  frontier[currentLength] = node;
  currentLength++;
  frontier.length = currentLength;
};

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
  const visitedNodesInOrder: Node[] = [];

  // get logical start and end nodes by coordinates
  const startNode: Node = grid[startNodeCoords.row][startNodeCoords.col];
  const endNode: Node = grid[endNodeCoords.row][endNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  // queue for traversing the grid
  const frontier: Node[] = [];
  pushToFrontier(frontier, startNode);

  // map preceding node to each node.
  const cameFrom = new CustomMap<Node, Node | null>();
  cameFrom.put(startNode, null);

  const costSoFar = new CustomMap<Node, number>();
  costSoFar.put(startNode, 0);

  // keep on checking the queue until it's empty
  while (frontier && frontier.length) {
    // pop queue
    const current: Node | undefined = frontier.shift();
    // early exit conditional
    if (current === endNode) {
      break;
    }

    if (current?.neighbors) {
      for (let index = 0; index < current.neighbors.length; index++) {
        const neighbor = current.neighbors[index];
        if (!cameFrom.get(neighbor) && !isWall(neighbor, myRefs)) {
          // movement costs not accounted for by Bfs - tracked for comparison purposes
          const newCost = costSoFar.get(current)! + getMovementCost(neighbor, myRefs);
          costSoFar.put(neighbor, newCost);

          let currentLength = visitedNodesInOrder.length;
          visitedNodesInOrder[currentLength] = neighbor;
          currentLength++;
          visitedNodesInOrder.length = currentLength;

          // frontier.push(neighbor);
          pushToFrontier(frontier, neighbor);
          cameFrom.put(neighbor, current);
        }
      }
    }
  }

  console.log('BFS Complete!');
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
