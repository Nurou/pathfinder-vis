/**
 * A simple heap implementation of PQ
 */
declare global {
  interface Array<T> {
    pushC(elem: T): Array<T>;
    popC(): Array<T>;
  }
}

const top = 0;
const parent = (i: number) => ((i + 1) >>> 1) - 1;
const left = (i: number) => (i << 1) + 1;
const right = (i: number) => (i + 1) << 1;

export class PriorityQueue {
  heap: any[];
  comparator: (a: any, b: any) => boolean;

  constructor(comparator = (a: any, b: any) => a > b) {
    this.heap = [];
    this.comparator = comparator;

    // custom push
    if (!Array.prototype.pushC) {
      Array.prototype.pushC = function <T>(this: T[], elem: T): any {
        let len = this.length;
        this[len] = elem;
        len++;
        this.length = len;
        return len;
      };
    }

    // custom pop
    if (!Array.prototype.popC) {
      Array.prototype.popC = function <T>(this: T[]): any {
        let len = this.length - 1;
        let value = this[len];
        this.length = len;
        delete this[len];
        return value;
      };
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[top];
  }

  push(...values: any[]) {
    values.forEach((value) => {
      // this.heap.push(value);
      this.heap.pushC(value);
      this.siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this.swap(top, bottom);
    }
    // this.heap.pop();
    this.heap.popC();
    this.siftDown();
    return poppedValue;
  }
  replace(value: any) {
    const replacedValue = this.peek();
    this.heap[top] = value;
    this.siftDown();
    return replacedValue;
  }
  greater(i: number, j: number) {
    return this.comparator(this.heap[i], this.heap[j]);
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  siftUp() {
    let node = this.size() - 1;
    while (node > top && this.greater(node, parent(node))) {
      this.swap(node, parent(node));
      node = parent(node);
    }
  }
  siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this.greater(left(node), node)) ||
      (right(node) < this.size() && this.greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this.greater(right(node), left(node))
          ? right(node)
          : left(node);
      this.swap(node, maxChild);
      node = maxChild;
    }
  }
  clear() {
    this.heap = [];
  }

  toString() {
    this.heap.forEach((el) => {
      console.log(el);
    });
  }
}
