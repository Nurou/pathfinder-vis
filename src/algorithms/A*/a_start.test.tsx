import { beforeAll, describe, expect, test } from 'vitest';
import { GridNode } from '../../data_structures/Node';
import { setNodeNeighbors } from '../../components/Graph/util';
import { aStar } from '.';
import { MockRefs } from '../shared';

const grid: GridNode[][] = [];
const mockRefs: MockRefs = { current: {} };

describe('verify initial state of grid', () => {
  /* Runs before all tests */
  beforeAll(() => {
    const GRID_ROWS = 20;
    const GRID_COLS = 30;
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: GridNode[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        // add a node for each row column
        const newNode = new GridNode(row, col);
        currentRow.push(newNode);
        mockRefs.current[`node-${row}-${col}`] = document.createElement('td');
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
            'node-3-400': document.createElement('td'),
            'node-10-10': document.createElement('td')
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
