import { Coordinates, PathfinderArgsTuple } from '../../types';
import { PriorityQueue } from '../../data_structures/PriorityQueue';
import { checkArgs, reconstructPath, isWall, getMovementCost, heuristic } from '../shared';
import GridNode from '../../data_structures/Node';
import { CustomMap } from '../../data_structures/Map';

/**
 *  An implementation of the Greedy Best-Fist Search, which uses a heuristic function to approximate the goal
 */
export const gbfs = (...args: PathfinderArgsTuple) => {
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

  const cameFrom = new CustomMap<GridNode, GridNode | null>();
  cameFrom.put(sourceNode, null);

  // cost tracked comparison purposes only - does not affect heuristic
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
      for (const neighbor of current.neighbors) {
        // neighbor can be visited once only
        if (isWall(neighbor, gridCellDOMElementRefs) || cameFrom.get(neighbor)) continue;

        let currentLength = visitedNodesInOrder.length;
        visitedNodesInOrder[currentLength] = neighbor;
        currentLength++;
        visitedNodesInOrder.length = currentLength;

        const priority = heuristic(destinationNode, neighbor);
        frontier.push([neighbor, priority]);
        cameFrom.put(neighbor, current);

        // movement costs not accounted for by Bfs - tracked for comparison purposes
        const newCost = costSoFar.get(current)! + getMovementCost(neighbor, gridCellDOMElementRefs);
        costSoFar.put(neighbor, newCost);
      }
    }
  }

  console.log('Greedy Bfs Complete!');
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
