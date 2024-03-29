import { beforeAll, describe, expect, test } from 'vitest';
import { Entry } from './Entry';
import GridNode from '../Node';

let node1: GridNode;
let node2: GridNode;

beforeAll(() => {
  node1 = new GridNode(1, 1);
  node2 = new GridNode(1, 2);
});

describe('a map entry', () => {
  test('should accept node type for both key and value ', () => {
    const entry = new Entry(node1, node2);
    expect(entry.getKey()).toBe(node1);
    expect(entry.getValue()).toBe(node2);
  });
  test('should accept and return correct value ', () => {
    const entry = new Entry(node1, node2);
    const node3 = new GridNode(1, 3);
    entry.setValue(node3);
    expect(entry.getValue().row).toBe(1);
    expect(entry.getValue().col).toBe(3);
  });
});
