/**
 * Custom implementation of an associative array (Map) entry
 */
export class Entry<K, V> {
  private key: K;
  private value: V;

  constructor(key: K, val: V) {
    this.key = key;
    this.value = val;
  }

  getKey(): K {
    return this.key;
  }

  getValue(): V {
    return this.value;
  }

  setValue(value: V): void {
    this.value = value;
  }

  toString(): void {
    console.log(`Key = ${this.key}, val = ${this.value}`);
  }
}
