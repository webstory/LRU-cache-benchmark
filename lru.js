/**
 * @author: Hoya Kim <hoya@mychar.info>, ChatGPT-4
 */
export class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
    this._update(key);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }
    this._update(key);
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  _update(key) {
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
  }
}
