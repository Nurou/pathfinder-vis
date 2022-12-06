import { GridNode } from '../data_structures/Node';
import { isWall, isGrass } from '../algorithms/util';

/**
 * This animates the shortest path once the visitation of nodes has concluded animating
 * @param {object} shortestPath
 * @param {object} gridCellDOMElementRefs
 */
const animateShortestPath = (
  shortestPath: GridNode[],
  gridCellDOMElementRefs: React.MutableRefObject<any>,
  ANIMATION_TIMEOUT: number
) => {
  shortestPath.forEach((node, index) => {
    setTimeout(() => {
      // exclude walls and end nodes
      const domNode = gridCellDOMElementRefs.current[`node-${node.row}-${node.col}`];
      if (!isWall(node, gridCellDOMElementRefs)) {
        domNode.classList.add('node-shortest-path');
      }
    }, ANIMATION_TIMEOUT * index);
  });
};

/**
 *  Animates the progression of the breadth-first search algorithm after the algorithm has concluded its work
 *
 * @param {object} nodesVisitedInOrder - array of nodes returned by algorithm
 * @param {object} shortestPath - array of nodes also from algorithm
 * @param {object} gridCellDOMElementRefs - array of references to dom nodes for adding style classes
 */
export const animateVisits = (
  nodesVisitedInOrder: GridNode[],
  shortestPath: GridNode[],
  gridCellDOMElementRefs: React.MutableRefObject<any>,
  animationSpeed = 50
) => {
  // animationSpeed is a number between 0 and 100
  // subtract from 100 to reverse slider values
  const ANIMATION_TIMEOUT_SHORTEST_PATH = 100 - animationSpeed;
  const ANIMATION_TIMEOUT_VISITS = ANIMATION_TIMEOUT_SHORTEST_PATH / 10;

  nodesVisitedInOrder.forEach((node, index) => {
    if (index === nodesVisitedInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(shortestPath, gridCellDOMElementRefs, ANIMATION_TIMEOUT_SHORTEST_PATH);
      }, ANIMATION_TIMEOUT_VISITS * index);
      return;
    }
    setTimeout(() => {
      const domNode: any = gridCellDOMElementRefs.current[`node-${node.row}-${node.col}`];
      if (isWall(node, gridCellDOMElementRefs)) return;

      if (!isGrass(node.row, node.col, gridCellDOMElementRefs)) {
        domNode.classList.add('node-visited');
      }
    }, ANIMATION_TIMEOUT_VISITS * index);
  });
};
