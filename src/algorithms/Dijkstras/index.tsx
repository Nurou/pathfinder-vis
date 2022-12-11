import { Coordinates, PathfinderArgsTuple } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall, getMovementCost } from '../shared';
import GridNode from '../../data_structures/Node';
import { CustomMap } from '../../data_structures/Map';

/**
 *  An implementation of Dijkstra's algorithm for path finding that accounts for the movement costs of nodes
 */

export const dijkstras = (...args: PathfinderArgsTuple) => {
  checkArgs(...args);

  const [grid, sourceNodeCoords, destinationNodeCoords, gridCellDOMElementRefs] = args;

  const visitedNodesInOrder: GridNode[] = [];

  // get logical start and end nodes by coordinates
  const sourceNode: GridNode = grid[sourceNodeCoords.row][sourceNodeCoords.col];
  const destinationNode: GridNode = grid[destinationNodeCoords.row][destinationNodeCoords.col];

  // clock performance
  let timer: number = -performance.now();

  const frontier = new PriorityQueue<[GridNode, number]>((a, b) => a[1] < b[1]);
  frontier.push([sourceNode, 0]);
  console.log('\nInitial contents:');
  console.log(frontier.peek()[0]); //=>

  const cameFrom = new CustomMap<GridNode, GridNode | null>();
  cameFrom.put(sourceNode, null);

  // keeps track of total movement cost from the start node to all nodes
  // same node can be visited multiple times with different costs
  const costSoFar = new CustomMap<GridNode, number>();
  costSoFar.put(sourceNode, 0);

  // keep on checking the queue until it's empty
  while (frontier && frontier.size()) {
    // pop queue
    const current: GridNode | undefined = frontier.pop()[0];

    // early exit conditional
    if (current === destinationNode) {
      break;
    }

    if (current?.neighbors) {
      for (let index = 0; index < current.neighbors.length; index++) {
        const neighbor = current.neighbors[index];
        // skip walls
        if (isWall(neighbor, gridCellDOMElementRefs)) continue;
        const newCost = costSoFar.get(current)! + getMovementCost(neighbor, gridCellDOMElementRefs);
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

  const shortestPath = reconstructPath(sourceNode, destinationNode, cameFrom);

  return {
    visitedNodesInOrder,
    shortestPath,
    timer,
    costSoFar
  };
};
