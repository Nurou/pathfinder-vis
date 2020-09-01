import { Entry } from './Entry';

export class MyMap<K, V> {
  private size: number;
  private values: Array<Entry<K, V> | null>;

  constructor() {
    this.size = 0;
    this.values = [];
  }

  get(key: K): V | null {
    for (let index = 0; index < this.size; index++) {
      if (this.values[index]) {
        if (this.values[index]!.getKey() == key) {
          return this.values[index]!.getValue();
        }
      }
    }
    return null;
  }

  put(key: K, value: V): void {
    let insert = true;
    if (this.values) {
      for (let index = 0; index < this.size; index++) {
        if (this.values[index]!.getKey() == key) {
          this.values[index]!.setValue(value);
          insert = false;
        }
      }
      if (insert) {
        this.values[this.size++] = new Entry<K, V>(key, value);
      }
    }
  }

  getSize(): number {
    return this.size;
  }

  remove(key: K): void {
    if (!this.values) return;
    for (let index = 0; index < this.size; index++) {
      if (this.values[index]!.getKey() == key) {
        this.values[index] = null;
        this.size--;
        this.condenseArray(index);
      }
    }
  }

  condenseArray(start: number): void {
    for (let index = start; index < this.size; index++) {
      this.values[index] = this.values[index + 1];
    }
  }

  keySet(): Array<K> {
    let keys = new Array<K>();
    let arrIndex = 0;
    for (let index = 0; index < this.size; index++) {
      keys[arrIndex++] = this.values[index]!.getKey();
    }
    return keys;
  }
}
