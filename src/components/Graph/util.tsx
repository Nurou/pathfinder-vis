import { isEndNode, isStartNode } from '../../algorithms/shared';
import GridNode from '../../data_structures/Node';
import {
  Coordinates,
  CoordToNodeDOMElementMap,
  GridDimensions as GridDimensions
} from '../../types';

// enum GridCellType {
//   Start = 'start',
//   End = 'end',
//   Wall = 'wall',
//   Grass = 'grass',
//   Visited = 'visited'
// }

// function updateStyles(domNode: HTMLElement, type: GridCellType) {
//   switch (type) {
//     case 'start':
//       domNode.style.setProperty('background-color', '#22c55e');
//       break;
//     case 'end':
//       domNode.style.setProperty('background-color', '#dc2626');
//       break;
//     case 'visited':
//       domNode.classList.add('animate-pulse');
//       break;

//     default:
//       break;
//   }
// }

/**
 * Converts a node into wall or grass type by modifying
 * the actual node object stored in the grid
 * @param {number} row
 * @param {number} col
 */
export const convertToType = (
  row: number,
  col: number,
  conversionType: React.MutableRefObject<string | null>,
  startNodeCoords: React.MutableRefObject<Coordinates | null>,
  endNodeCoords: React.MutableRefObject<Coordinates | null>,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): void => {
  // target node
  const targetCell = gridCellDOMElementRefs.current?.[`node-${row}-${col}`];

  if (!targetCell) return;

  const alreadyOccupied = (targetCell: HTMLTableCellElement) => {
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

  if (!gridCellDOMElementRefs.current) return;

  if (conversionType.current === 'start') {
    // if start node already set, move it
    if (startNodeCoords.current) {
      // get current start node and convert back to regular
      const currentStartNode =
        gridCellDOMElementRefs.current[
          `node-${startNodeCoords.current.row}-${startNodeCoords.current.col}`
        ];
      currentStartNode.classList.remove('start');
      currentStartNode.classList.add('regular');
    }

    targetCell.classList.add('start');
    startNodeCoords.current = { row: row, col: col };

    return;
  }

  if (conversionType.current === 'end') {
    // if end node already set, move it
    if (endNodeCoords.current) {
      // get current end node and remove class
      const currentEndNode =
        gridCellDOMElementRefs.current[
          `node-${endNodeCoords.current.row}-${endNodeCoords.current.col}`
        ];

      currentEndNode.classList.remove('end');
      currentEndNode.classList.add('regular');
    }

    targetCell.classList.add('end');
    endNodeCoords.current = { row: row, col: col };

    return;
  }

  targetCell.classList.add(conversionType.current);
};

/**
 * covers each of the grid cells in regular terrain
 * @param gridCellDOMElementRefs
 */
export const coverInTerrain = (
  gridCellDOMElementRefs: React.MutableRefObject<Record<string, HTMLTableCellElement> | null>
): void => {
  if (!gridCellDOMElementRefs.current) return;

  Object.values(gridCellDOMElementRefs.current).forEach((el: any) => {
    if (!el.classList.contains('start') && !el.classList.contains('end')) {
      el.classList.add('regular');
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
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>,
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
        domNode.classList.remove('visited', 'node-shortest-path', 'wall', 'grass');
        domNode.classList.add('regular');
      } else if (
        domNode.classList.contains('visited') ||
        domNode.classList.contains('node-shortest-path')
      ) {
        domNode.classList.remove('visited', 'node-shortest-path');
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
  conversionType: React.MutableRefObject<string | null>,
  startNodeCoords: React.MutableRefObject<Coordinates | null>,
  endNodeCoords: React.MutableRefObject<Coordinates | null>,
  setMazeGenerated: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  console.log('💩 ~ file: util.tsx:244 ~ conversionType', conversionType);
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
