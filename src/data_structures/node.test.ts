import { setNodeNeighbors, populateGrid } from './../components/Visualiser/util';

let grid: any = [];
const GRID_ROWS = 20;
const GRID_COLS = 30;

beforeAll(() => {
  populateGrid(grid, { rows: GRID_ROWS, cols: GRID_COLS });
});

describe('initially', () => {
  test('node has no neighbors ', () => {
    // get some node from grid
    let someNode = grid[10][20];
    // check its neighbors
    expect(someNode.getNeighbors()).toBeNull;
  });
});

describe('once neighbors set', () => {
  beforeEach(() => {
    setNodeNeighbors(grid);
  });

  test('no node has more than four neighbors ', () => {
    let maxNumberOfNeighbors = 0;

    for (const row of grid) {
      for (const node of row) {
        let neighborCount = node.getNeighbors().length;
        if (neighborCount >= maxNumberOfNeighbors) {
          maxNumberOfNeighbors = neighborCount;
        }
      }
    }
    expect(maxNumberOfNeighbors).toEqual(4);
  });

  test('each node has at least two neighbors ', () => {
    let minNumberOfNeighbors = Infinity;

    for (const row of grid) {
      for (const node of row) {
        let neighborCount = node.getNeighbors().length;
        if (neighborCount <= minNumberOfNeighbors) {
          minNumberOfNeighbors = neighborCount;
        }
      }
    }
    expect(minNumberOfNeighbors).toEqual(2);
  });

  test('node has no neighbors out of grid bounds ', () => {
    let hasNeighborOutOfBounds = false;
    for (const row of grid) {
      for (const node of row) {
        for (const neighbor of node.getNeighbors()) {
          if (neighbor.row >= GRID_ROWS || neighbor.col >= GRID_COLS) {
            hasNeighborOutOfBounds = true;
          }
        }
      }
    }
    expect(hasNeighborOutOfBounds).toBeFalsy;
  });
});
