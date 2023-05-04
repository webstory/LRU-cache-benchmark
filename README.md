# LRU Performance benchmark

This repository contains a benchmark comparing the performance of a custom LRUCache implementation with the popular `lru-cache` library. The custom LRUCache implementation is lightweight and optimized for specific use cases.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/webstory/LRU-cache-benchmark.git
cd lru-cache-benchmark
```

2. Install the required dependencies:
```bash
npm install
```

3. Run the benchmark:
```bash
node index.js
```

## Benchmark result
The benchmark simulates real-world usage by generating HTTP GET requests based on a dataset of [web server access logs](https://www.kaggle.com/datasets/shawon10/web-log-dataset). The performance of the custom LRUCache implementation is compared to the lru-cache library in terms of cache hit-ratio, cache hits, and cache misses.

In our tests, the custom LRUCache implementation showed better performance compared to the lru-cache library.

    Note: Performance results may vary depending on your specific use case and dataset. We recommend running the benchmark with your own dataset to get the most accurate results.

| Implementation       | Cache Size | Cache Hits | Cache Misses | Hit Ratio | Execution Time |
|----------------------|------------|------------|--------------|-----------|----------------|
| npm lru-cache        | 100        | 15402      | 606          | 0.962     | 213.77958 ms   |
| My LRU               | 100        | 15402      | 606          | 0.962     | 189.25579 ms   |
| npm lru-cache        | 50         | 14732      | 1276         | 0.920     | 211.84307 ms   |
| My LRU               | 50         | 14732      | 1276         | 0.920     | 189.01468 ms   |
| npm lru-cache        | 30         | 13684      | 2324         | 0.855     | 211.68816 ms   |
| My LRU               | 30         | 13684      | 2324         | 0.855     | 188.85813 ms   |
| npm lru-cache        | 20         | 12214      | 3794         | 0.763     | 211.66974 ms   |
| My LRU               | 20         | 12214      | 3794         | 0.763     | 188.73518 ms   |
| npm lru-cache        | 10         | 9376       | 6632         | 0.586     | 211.68224 ms   |
| My LRU               | 10         | 9376       | 6632         | 0.586     | 188.54359 ms   |


## Custom LRUCache Implementation
The custom LRUCache implementation is a lightweight and optimized solution for caching key-value pairs in a least recently used (LRU) manner. It uses a combination of JavaScript Map and doubly-linked list data structures to provide quick lookups and efficient cache evictions.

You can find the custom LRUCache implementation in the [lru.js](./lru.js) file.

## Contributing
If you'd like to contribute to the project or have any suggestions, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.