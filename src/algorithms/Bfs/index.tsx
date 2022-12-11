import { GridNode } from '../../data_structures/Node';
import { reconstructPath, checkArgs, isWall, getMovementCost } from '../shared';
import { Coordinates, CoordToNodeDOMElementMap, PathfinderArgsTuple } from '../../types';
import { CustomMap } from '../../data_structures/Map';

/* logical implementation of BFS
 */
const pushToFrontier = (frontier: GridNode[], node: GridNode) => {
  let currentLength = frontier.length;
  frontier[currentLength] = node;
  currentLength++;
  frontier.length = currentLength;
};

export const bfs = (...args: PathfinderArgsTuple) => {
  checkArgs(...args);

  const [grid, sourceNodeCoords, destinationNodeCoords, gridCellDOMElementRefs] = args;

  // uses to animating flood/frontier
  const visitedNodesInOrder: GridNode[] = [];

  // get logical start and end nodes by coordinates
  const sourceNode: GridNode = grid[sourceNodeCoords.row][sourceNodeCoords.col];
  const destinationNode: GridNode = grid[destinationNodeCoords.row][destinationNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  // queue for traversing the grid
  const frontier: GridNode[] = [];
  pushToFrontier(frontier, sourceNode);

  // map preceding node to each node.
  const cameFrom = new CustomMap<GridNode, GridNode | null>();
  cameFrom.put(sourceNode, null);

  const costSoFar = new CustomMap<GridNode, number>();
  costSoFar.put(sourceNode, 0);

  // keep on checking the queue until it's empty
  while (frontier && frontier.length) {
    // pop queue
    const current: GridNode | undefined = frontier.shift();

    if (current === destinationNode) {
      break;
    }

    if (current?.neighbors) {
      for (let index = 0; index < current.neighbors.length; index++) {
        const neighbor = current.neighbors[index];
        if (!cameFrom.get(neighbor) && !isWall(neighbor, gridCellDOMElementRefs)) {
          // movement costs not accounted for by Bfs - tracked for comparison purposes
          const newCost =
            costSoFar.get(current)! + getMovementCost(neighbor, gridCellDOMElementRefs);
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

  const shortestPath = reconstructPath(sourceNode, destinationNode, cameFrom);

  return {
    visitedNodesInOrder,
    shortestPath,
    timer,
    costSoFar
  };
};
