import Node from '../data_structures/Node';

/**
 *  Animates the progression of the breadth-first search algorithm after the algorithm has concluded its work
 *
 * @param {object} nodesVisitedInOrder - array of nodes returned by algorithm
 * @param {object} shortestPath - array of nodes also from algorithm
 * @param {object} myRefs - array of references to dom nodes for adding style classes
 */
export const animatePathFinding = (
  nodesVisitedInOrder: Node[],
  shortestPath: Node[],
  myRefs: any
) => {
  // const ANIMATION_TIMEOUT = 15;
  const ANIMATION_TIMEOUT = 5;

  nodesVisitedInOrder.forEach((node, index) => {
    if (index === nodesVisitedInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(shortestPath, myRefs);
      }, ANIMATION_TIMEOUT * index);
      return;
    }
    setTimeout(() => {
      // exclude walls and end nodes
      let domNode: any = myRefs.current[`node-${node.row}-${node.col}`];
      if (!domNode.classList.contains('wall') && !domNode.classList.contains('grass')) {
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
const animateShortestPath = (shortestPath: Node[], myRefs: React.MutableRefObject<any>) => {
  shortestPath.forEach((node, index) => {
    // const ANIMATION_TIMEOUT = 50;
    const ANIMATION_TIMEOUT = 20;
    setTimeout(() => {
      // exclude walls and end nodes
      let domNode = myRefs.current[`node-${node.row}-${node.col}`];
      if (!domNode.classList.contains('wall')) {
        domNode.classList.add('node-shortest-path');
      }
    }, ANIMATION_TIMEOUT * index);
  });
};
