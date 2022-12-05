import { beforeEach, afterEach, describe, expect, test } from 'vitest';
import { PriorityQueue } from './PriorityQueue';

let pq: PriorityQueue<[string, number]> | null = null;

describe('initially', () => {
  beforeEach(() => {
    //init PQ
    pq = new PriorityQueue((a, b) => a[1] < b[1]);
  });

  test('heap should be empty', () => {
    expect(pq?.size()).toEqual(0);
  });

  test('peeking should return undefined', () => {
    expect(pq?.peek()).toBeUndefined();
  });
});

describe('after the queue has been added to', () => {
  beforeEach(() => {
    pq?.push(['first', 1], ['second', 2], ['third', 3]);
  });

  afterEach(() => {
    pq?.clear();
  });

  test('pushing returns correct size', () => {
    expect(pq?.push(['fourth', 4])).toEqual(4);
    pq?.pop();
  });

  test('heap should not be empty', () => {
    expect(pq?.size()).toBeGreaterThan(0);
  });

  test('peeking should return smallest value', () => {
    expect(pq?.peek()[1]).toEqual(1);
  });

  test('popping decrements heap size by one', () => {
    pq?.pop();
    expect(pq?.size()).toEqual(2);
  });

  test('popping returns smallest value', () => {
    expect(pq?.peek()[1]).toEqual(1);
  });

  test('clearing results in an empty heap', () => {
    pq?.clear();
    expect(pq?.size()).toEqual(0);
  });
});
