import { isDestinationNode, isSourceNode } from '../../algorithms/shared';
import { CustomMap } from '../../data_structures/Map';
import GridNode from '../../data_structures/Node';
import {
  CellType,
  Coordinates,
  CoordToNodeDOMElementMap,
  GridDimensions as GridDimensions
} from '../../types';

/**
 * Converts a node into wall or grass type by modifying
 * the actual node object stored in the grid
 * @param {number} row
 * @param {number} col
 */
export const convertToType = (
  row: number,
  col: number,
  conversionType: React.MutableRefObject<CellType | null>,
  sourceNodeCoords: React.MutableRefObject<Coordinates | null>,
  destinationNodeCoords: React.MutableRefObject<Coordinates | null>,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): void => {
  if (!conversionType.current) return;
  // target node
  const targetCell = gridCellDOMElementRefs.current?.[`node-${row}-${col}`];

  if (!targetCell) return;

  const alreadyOccupied = (targetCell: HTMLTableCellElement) => {
    return (
      targetCell.classList.contains('source') ||
      targetCell.classList.contains('destination') ||
      targetCell.classList.contains('wall') ||
      targetCell.classList.contains('grass')
    );
  };

  if (alreadyOccupied(targetCell) || !conversionType.current) {
    return;
  }

  targetCell.classList.remove('regular');

  if (!gridCellDOMElementRefs.current) return;

  if (conversionType.current === 'source') {
    // if start node already set, move it
    if (sourceNodeCoords.current) {
      // get current start node and convert back to regular
      const currentSourceNode =
        gridCellDOMElementRefs.current[
          `node-${sourceNodeCoords.current.row}-${sourceNodeCoords.current.col}`
        ];
      currentSourceNode.classList.remove('source');
      currentSourceNode.classList.add('regular');
    }

    targetCell.classList.add('source');
    sourceNodeCoords.current = { row: row, col: col };

    return;
  }

  if (conversionType.current === 'destination') {
    // if end node already set, move it
    if (destinationNodeCoords.current) {
      // get current end node and remove class
      const currentDestinationNode =
        gridCellDOMElementRefs.current[
          `node-${destinationNodeCoords.current.row}-${destinationNodeCoords.current.col}`
        ];

      currentDestinationNode.classList.remove('destination');
      currentDestinationNode.classList.add('regular');
    }

    targetCell.classList.add('destination');
    destinationNodeCoords.current = { row: row, col: col };

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
    if (!el.classList.contains('source') && !el.classList.contains('destination')) {
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
  grid: GridNode[][],
  gridCellDOMElementRefs: React.MutableRefObject<any>
): void => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const randomBoolean = Math.random() >= 0.75;
      if (
        randomBoolean &&
        !isSourceNode(row, col, gridCellDOMElementRefs) &&
        !isDestinationNode(row, col, gridCellDOMElementRefs)
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
  costSoFar: CustomMap<GridNode, number>,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
): void => {
  return costSoFar.keySet().forEach((key) => {
    const domNode = gridCellDOMElementRefs.current?.[`node-${key.row}-${key.col}`];
    if (!domNode) return;
    if (!domNode.classList.contains('source') && !domNode.classList.contains('destination')) {
      domNode.innerHTML = domNode.innerHTML ? '' : String(costSoFar.get(key));
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
  conversionType: React.MutableRefObject<CellType | null>,
  sourceNodeCoords: React.MutableRefObject<Coordinates | null>,
  destinationNodeCoords: React.MutableRefObject<Coordinates | null>,
  setMazeGenerated: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (!gridCellDOMElementRefs.current) return;

  // if maze already generated, clear previous
  if (mazeIsGenerated) {
    clear(grid, gridCellDOMElementRefs, true);
  }

  // restrict to LHS of grid
  const SN_COORDS: Coordinates = {
    row: getRandomArbitrary(0, gridDimensions.rows),
    col: getRandomArbitrary(0, gridDimensions.cols / 2)
  };

  // restrict to RHS of grid
  const EN_COORDS: Coordinates = {
    row: getRandomArbitrary(0, gridDimensions.rows),
    col: getRandomArbitrary(gridDimensions.cols / 2, gridDimensions.cols)
  };

  // add start and end nodes
  if (Object.keys(gridCellDOMElementRefs.current).length !== 0 && SN_COORDS && EN_COORDS) {
    conversionType.current = 'source';
    convertToType(
      SN_COORDS.row,
      SN_COORDS.col,
      conversionType,
      sourceNodeCoords,
      destinationNodeCoords,
      gridCellDOMElementRefs
    );
    conversionType.current = 'destination';
    convertToType(
      EN_COORDS.row,
      EN_COORDS.col,
      conversionType,
      sourceNodeCoords,
      destinationNodeCoords,
      gridCellDOMElementRefs
    );
  }

  addWallsRandomly(grid, gridCellDOMElementRefs);

  setMazeGenerated(true);

  conversionType.current = null;
};
