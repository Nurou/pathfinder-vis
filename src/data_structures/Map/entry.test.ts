import { Entry } from './Entry';
import Node from '../Node';

let node1: Node;
let node2: Node;

beforeAll(() => {
  node1 = new Node(1, 1);
  node2 = new Node(1, 2);
});

describe('a map entry', () => {
  test('should accept node type for both key and value ', () => {
    let entry = new Entry(node1, node2);
    expect(entry.getKey()).toBe(node1);
    expect(entry.getValue()).toBe(node2);
  });
  test('should accept and return correct value ', () => {
    let entry = new Entry(node1, node2);
    let node3 = new Node(1, 3);
    entry.setValue(node3);
    expect(entry.getValue().row).toBe(1);
    expect(entry.getValue().col).toBe(3);
  });
});
