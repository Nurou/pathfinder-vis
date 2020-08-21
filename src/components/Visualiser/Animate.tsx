import { Node } from '../../data_structures/Node';
import { isWall, isStartNode, isEndNode, isGrass } from '../../algorithms/util';
import { number } from 'prop-types';

type TAnimationSpeed = 'fast' | 'medium' | 'slow';

/**
 *  Animates the progression of the breadth-first search algorithm after the algorithm has concluded its work
 *
 * @param {object} nodesVisitedInOrder - array of nodes returned by algorithm
 * @param {object} shortestPath - array of nodes also from algorithm
 * @param {object} myRefs - array of references to dom nodes for adding style classes
 */
export const animateVisits = (
  nodesVisitedInOrder: Node[],
  shortestPath: Node[],
  myRefs: React.MutableRefObject<any>,
  animationSpeed?: TAnimationSpeed
) => {
  let ANIMATION_TIMEOUT = 10;

  // switch (animationSpeed) {
  //   case 'fast':
  //     ANIMATION_TIMEOUT = 10;
  //     break;
  //   case 'medium':
  //     ANIMATION_TIMEOUT = 20;
  //     break;
  //   case 'slow':
  //     ANIMATION_TIMEOUT = 30;
  //     break;
  //   default:
  //     ANIMATION_TIMEOUT = 5;
  //     break;
  // }

  nodesVisitedInOrder.forEach((node, index) => {
    if (index === nodesVisitedInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(shortestPath, myRefs);
      }, ANIMATION_TIMEOUT * index);
      return;
    }
    setTimeout(() => {
      let domNode: any = myRefs.current[`node-${node.row}-${node.col}`];
      if (isWall(node, myRefs)) return;

      if (!isGrass(node.row, node.col, myRefs)) {
        domNode.classList.add('node-visited');
      }
    }, ANIMATION_TIMEOUT * index);
  });
};

/**
 * This animates the shortest path once the visitation of nodes has concluded animating
 * @param {object} shortestPath
 * @param {object} myRefs
 */
const animateShortestPath = (
  shortestPath: Node[],
  myRefs: React.MutableRefObject<any>,
  animationSpeed?: TAnimationSpeed
) => {
  let ANIMATION_TIMEOUT = 10;

  // switch (animationSpeed) {
  //   case 'fast':
  //     ANIMATION_TIMEOUT = 10;
  //     break;
  //   case 'medium':
  //     ANIMATION_TIMEOUT = 20;
  //     break;
  //   case 'slow':
  //     ANIMATION_TIMEOUT = 30;
  //     break;
  //   default:
  //     ANIMATION_TIMEOUT = 5;
  //     break;
  // }

  shortestPath.forEach((node, index) => {
    setTimeout(() => {
      // exclude walls and end nodes
      let domNode = myRefs.current[`node-${node.row}-${node.col}`];
      if (!isWall(node, myRefs)) {
        domNode.classList.add('node-shortest-path');
      }
    }, ANIMATION_TIMEOUT * index);
  });
};
