import { Node } from './../Node';
import { CustomMap } from './index';

let node1: Node;
let node2: Node;

/* Runs before all tests */
beforeAll(() => {
  // instantiate map
  node1 = new Node(1, 1);
  node2 = new Node(1, 2);
});

describe('a map:', () => {
  test('should return correct size and values when populated', () => {
    let map = new CustomMap<string, number>();
    map.put('Lars', 1);
    map.put('Lars', 2);
    map.put('Lars', 1);
    expect(map.get('Lars')).toBe(1);

    for (let i = 0; i < 100; i++) {
      map.put(i.toString(), i);
    }
    expect(map.getSize()).toBe(101);
    expect(map.get('51')).toBe(51);
  });

  test('should be able to have keys removed', () => {
    let map = new CustomMap<Node, Node>();
    map.put(node1, node2);
    map.remove(node1);
    expect(map.getSize()).toBe(0);
  });

  test('should be able to find keys it contains', () => {
    let map = new CustomMap<Node, Node>();
    map.put(node1, node2);
    expect(map.has(node1)).toBeTruthy;
    expect(map.has(node2)).toBeTruthy;
  });

  test('should return the correct set of keys', () => {
    let map = new CustomMap<Node, Node>();
    map.put(node1, node2);
    map.put(node2, node1);
    expect(map.keySet().length).toBe(2);
    expect(map.keySet()[0]).toEqual(node1);
    expect(map.keySet()[1]).toEqual(node2);
  });
});
