import { Node } from '../../data_structures/Node';
import { setNodeNeighbors } from '../../components/Graph/util';
import { aStar } from '.';

const grid: any = [];
const mockRefs: any = { current: {} };

describe('verify initial state of grid', () => {
  /* Runs before all tests */
  beforeAll(() => {
    const GRID_ROWS = 20;
    const GRID_COLS = 30;
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        // add a node for each row column
        const newNode = new Node(row, col);
        currentRow.push(newNode);
        mockRefs.current[`node-${row}-${col}`] = { classList: [] };
      }
      grid.push(currentRow);
    }

    setNodeNeighbors(grid);
  });

  test('throw if no arguments provided', () => {
    expect(aStar).toThrow();
  });

  test('throw if nodes are outside grid boundaries', () => {
    expect(() =>
      aStar(
        grid,
        { row: -3, col: 400 },
        { row: 10, col: 10 },
        {
          current: {
            'node--3-400': { classList: [] },
            'node-10-10': { classList: [] }
          }
        }
      )
    ).toThrow();
  });

  test('number of traversed nodes one when start and end adjacent to one another', () => {
    const { shortestPath } = aStar(grid, { row: 1, col: 1 }, { row: 1, col: 2 }, mockRefs);
    expect(shortestPath.length).toBe(2);
  });
});
