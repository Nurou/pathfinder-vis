import { isEndNode, isStartNode } from '../../algorithms/util';
import GridNode from '../../data_structures/Node';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  GridDimensions as GridDimensions
} from '../../types';

const END_NODE_SVG =
  '<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}.st1{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}.st2{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:5.2066,0;}</style><polyline class="st0" points="3,29 5,29 16,18 27,29 29,29 "/><path class="st0" d="M11,23L11,23c3.1,1.8,6.9,1.8,10,0l0,0"/><line class="st0" x1="16" y1="4" x2="16" y2="18"/><rect x="16" y="4" class="st0" width="10" height="9"/><polyline class="st0" points="26,7 30,7 30,16 21,16 26,13 "/></svg>';

const START_NODE_SVG =
  '<svg  viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch --><title>icon 40 checkered flag</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="icon-40-checkered-flag" sketch:type="MSArtboardGroup" fill="#000000"><path d="M24.0175781,17.4166535 C24.0175781,17.4166535 22.2113164,18.3316275 19.4083722,17.8767081 C19.2142856,17.8452078 18.9344208,17.7799433 19,17.793349 L19,13.797991 C18.1952748,13.6533697 17.3302513,13.4030494 16.4337934,12.9993592 C15.5656631,12.6084254 14.7499845,12.3553568 14,12.2008957 L14,16.1791279 C14.1037835,16.19763 13.865648,16.1742092 13.6363055,16.1416815 C11.0347515,15.7727031 9,16.4315453 9,16.4315453 L9,12.4116425 C9.00012966,12.4116002 11.2275178,11.6848603 14,12.1791279 L14,8.20089571 C10.9605781,7.57491953 9.00011038,8.56846668 9,8.56852262 L9,4.59389917 C9,4.59389917 10.9602707,3.60799641 14,4.22746321 L14,8.17912786 C14.8013354,8.3219869 15.6482077,8.56684813 16.5,8.96073994 C17.3911825,9.37284683 18.2296197,9.63586744 19,9.79334903 L19,5.8132889 C21.8978104,6.33337039 24.0175781,5.49392359 24.0175781,5.49392359 L24.0175781,9.53342032 C24.0063347,9.49537606 24,9.47442844 24,9.47442844 C23.9998781,9.47447709 21.8883365,10.3170686 19,9.79799098 L19,13.793349 C19.709621,13.9384102 20.3614969,13.9939234 20.9436608,13.9939236 C22.8426776,13.9939242 23.9999143,13.4032319 24,13.4031882 L24.0175781,17.4166535 L24.0175781,17.4166535 Z M8,28.9939236 L9,28.9939236 L9,17.5387624 C10.377296,17.0432589 13.0805236,16.5047312 16.5,17.9939238 C21.522644,20.1813011 25,17.9939236 25,17.9939236 L25,3.99392359 C25,3.99392359 21.5237426,6.23025181 16.5,3.9939236 C11.4762573,1.75759551 8,3.99392359 8,3.99392359 L8,11.9939236 L8,28.9939236 L8,28.9939236 Z" id="checkered-flag" sketch:type="MSShapeGroup"></path></g></g></svg>';

const addIcon = (domNode: HTMLDivElement, type: string) => {
  domNode.innerHTML = type === 'start' ? START_NODE_SVG : type === 'end' ? END_NODE_SVG : '';
};

/**
 * Converts a node into wall or grass type by modifying
 * the actual node object stored in the grid
 * @param {number} row
 * @param {number} col
 */
export const convertToType = (
  row: number,
  col: number,
  conversionType: React.MutableRefObject<string>,
  startNodeCoords: React.MutableRefObject<Coordinates>,
  endNodeCoords: React.MutableRefObject<Coordinates>,
  gridCellDOMElementRefs: React.MutableRefObject<any>
): void => {
  // target node
  const targetCell = gridCellDOMElementRefs.current[`node-${row}-${col}`];

  if (!targetCell) return;

  const alreadyOccupied = (targetCell: HTMLDivElement) => {
    return (
      targetCell.classList.contains('start') ||
      targetCell.classList.contains('end') ||
      targetCell.classList.contains('wall') ||
      targetCell.classList.contains('grass')
    );
  };

  if (alreadyOccupied(targetCell) || !conversionType.current) {
    return;
  }

  targetCell.classList.remove('regular');

  if (conversionType.current === 'start') {
    // if start node already set, move it
    if (startNodeCoords.current) {
      // get current start node and convert back to regular
      const currentStartNode =
        gridCellDOMElementRefs!.current[
          `node-${startNodeCoords.current.row}-${startNodeCoords.current.col}`
        ];
      currentStartNode.classList.remove('start');
      currentStartNode.classList.add('regular');
      currentStartNode.innerHTML = null;
    }

    targetCell.classList.add('start');
    startNodeCoords.current = { row: row, col: col };

    // add icon
    addIcon(targetCell, 'start');
    return;
  }

  if (conversionType.current === 'end') {
    // if end node already set, move it
    if (endNodeCoords.current) {
      // get current end node and remove class
      const currentEndNode =
        gridCellDOMElementRefs!.current[
          `node-${endNodeCoords.current.row}-${endNodeCoords.current.col}`
        ];

      currentEndNode.classList.remove('end');
      currentEndNode.classList.add('regular');
      currentEndNode.innerHTML = null;
    }

    targetCell.classList.add('end');
    endNodeCoords.current = { row: row, col: col };

    addIcon(targetCell, 'end');

    return;
  }

  targetCell.classList.add(conversionType.current);
};

/**
 * covers each of the grid cells in regular terrain
 * @param gridCellDOMElementRefs
 */
export const coverInTerrain = (
  gridCellDOMElementRefs: React.MutableRefObject<Record<string, HTMLElement> | null>
): void => {
  if (!gridCellDOMElementRefs.current) return;

  Object.values(gridCellDOMElementRefs.current).forEach((el: any) => {
    if (!el.classList.contains('start') && !el.classList.contains('end')) {
      el.classList.add('regular');
      el.classList.add('haha');
    }
  });
};

export const populateGrid = (gridDimensions: GridDimensions): GridNode[][] => {
  const grid: GridNode[][] = [];

  for (let row = 0; row < gridDimensions.rows; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < gridDimensions.cols; col++) {
      // add a node for each row column
      const newNode = new GridNode(row, col);
      currentRow.push(newNode);
    }
    // add the whole row
    grid.push(currentRow);
  }

  return grid;
};

export const addWallsRandomly = (
  grid: GridNode[][] | null,
  gridCellDOMElementRefs: React.MutableRefObject<any>
): void => {
  for (let row = 0; row < grid!.length; row++) {
    for (let col = 0; col < grid![row].length; col++) {
      const randomBoolean = Math.random() >= 0.75;
      if (
        randomBoolean &&
        !isStartNode(row, col, gridCellDOMElementRefs) &&
        !isEndNode(row, col, gridCellDOMElementRefs)
      ) {
        gridCellDOMElementRefs.current[`node-${row}-${col}`].classList.add('wall');
      }
    }
  }
};

/**
 * register neighbors for each node
 * @param {GridNode[][]} grid
 */
export const setNodeNeighbors = (grid: GridNode[][]): void => {
  for (const row of grid) {
    for (const node of row) {
      node.setNeighbors(grid);
    }
  }
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Enables movement costs to be displayed on the grid
 * @param costSoFar
 * @param gridCellDOMElementRefs
 */
export const displayDistances = (
  costSoFar: any,
  gridCellDOMElementRefs: React.MutableRefObject<any>
): void => {
  [...costSoFar].forEach((mapping) => {
    const domNode = gridCellDOMElementRefs.current[`node-${mapping[0].row}-${mapping[0].col}`];
    if (!domNode.classList.contains('start') && !domNode.classList.contains('end')) {
      domNode.innerHTML = domNode.innerHTML ? null : mapping[1];
    }
  });
};

/**
 * clears the grid for algo re-run
 * @param {object} grid - 2D array of the logical grid nodes in their current state (after algorithm has run)
 * @param {object} gridCellDOMElementRefs - refs for all grid DOM elements
 */
export const clear = (
  grid: GridNode[][],
  gridCellDOMElementRefs: React.RefObject<CoordToNodeDOMElementMap>,
  all?: boolean
): void => {
  for (const row of grid) {
    for (const node of row) {
      const domNode = gridCellDOMElementRefs.current?.[`node-${node.row}-${node.col}`];
      if (!domNode) return;

      if (!isNaN(parseInt(domNode.innerHTML))) {
        domNode.innerHTML = '';
      }
      // when clearing the whole graph
      if (all) {
        domNode.classList.remove('node-visited', 'node-shortest-path', 'wall', 'grass');
        domNode.classList.add('regular');
      } else if (
        domNode.classList.contains('node-visited') ||
        domNode.classList.contains('node-shortest-path')
      ) {
        domNode.classList.remove('node-visited', 'node-shortest-path');
        domNode.classList.add('regular');
      }
    }
  }
};

/**
 * Generates a random maze using walls and positions
 *  both the start and end nodes on the grid
 */
export const createMaze = (
  mazeIsGenerated: boolean,
  grid: GridNode[][],
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>,
  gridDimensions: GridDimensions,
  conversionType: React.MutableRefObject<string>,
  startNodeCoords: React.MutableRefObject<any>,
  endNodeCoords: React.MutableRefObject<any>,
  setMazeGenerated: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (!gridCellDOMElementRefs.current) return;

  // if maze already generated, clear previous
  if (mazeIsGenerated) {
    clear(grid, gridCellDOMElementRefs, true);
  }

  // restrict to LHS of grid
  const SN_COORDS: Coordinates = {
    row: getRandomArbitrary(0, gridDimensions!.rows),
    col: getRandomArbitrary(0, gridDimensions!.cols / 2)
  };

  // restrict to RHS of grid
  const EN_COORDS: Coordinates = {
    row: getRandomArbitrary(0, gridDimensions!.rows),
    col: getRandomArbitrary(gridDimensions!.cols / 2, gridDimensions!.cols)
  };

  // add start and end nodes
  if (Object.keys(gridCellDOMElementRefs.current).length !== 0 && SN_COORDS && EN_COORDS) {
    conversionType.current = 'start';
    convertToType(
      SN_COORDS.row,
      SN_COORDS.col,
      conversionType,
      startNodeCoords,
      endNodeCoords,
      gridCellDOMElementRefs
    );
    conversionType.current = 'end';
    convertToType(
      EN_COORDS.row,
      EN_COORDS.col,
      conversionType,
      startNodeCoords,
      endNodeCoords,
      gridCellDOMElementRefs
    );
  }

  addWallsRandomly(grid, gridCellDOMElementRefs);

  setMazeGenerated(true);
};
