import { beforeAll, expect, test } from 'vitest';
import { dijkstras } from '.';
import { GridNode } from '../../data_structures/Node';
import { setNodeNeighbors } from '../../util';
import { MockRefs } from '../shared';

const grid: GridNode[][] = [];
const mockRefs: MockRefs = { current: {} };
const GRID_ROWS = 20;
const GRID_COLS = 30;

beforeAll(() => {
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
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
  expect(dijkstras).toThrow();
});

test('throw if nodes are outside grid boundaries', () => {
  expect(() =>
    dijkstras(
      grid,
      { row: -3, col: 400 },
      { row: 10, col: 10 },
      {
        current: {
          'node--3-400': document.createElement('td'),
          'node-10-10': document.createElement('td')
        }
      }
    )
  ).toThrow();
});

test('number of traversed nodes one when start and end adjacent to one another', () => {
  const { shortestPath } = dijkstras(grid, { row: 1, col: 1 }, { row: 1, col: 2 }, mockRefs);
  expect(shortestPath.length).toBe(2);
});
