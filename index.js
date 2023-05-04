import { createReadStream } from "fs";
import readline from "readline";

import { LRUCache as LRUCache1 } from "lru-cache";
import { LRUCache as LRUCache2 } from "./lru.js";

import performance from "performance-now";

async function* readCSV(filePath) {
  const fileStream = createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const row = line.split(",");
    yield row;
  }
}

async function benchmark(csv_generator, cache, name = "Untitled") {
  let hit = 0;
  let miss = 0;
  let start = performance();
  let end;
  for await (const row of csv_generator) {
    // console.log(row);
    const req = row[2];
    const resCode = row[3];
    if (cache.has(req)) {
      hit++;
    } else {
      miss++;
      cache.set(req, resCode /* As *fake* response value */);
    }
  }
  end = performance();

  return { name, hit, miss, time: end - start };
}

async function main() {
  const filePath = "./weblog.csv";

  const cacheSizes = [100, 50, 30, 20, 10];

  const result = (
    await Promise.all(
      cacheSizes.map(async (size) => {
        const res1 = {
          size,
          ...(await benchmark(
            readCSV(filePath),
            new LRUCache1({ max: size }),
            "npm lru-cache"
          )),
        };

        const res2 = {
          size,
          ...(await benchmark(
            readCSV(filePath),
            new LRUCache2(size),
            "My LRU"
          )),
        };

        return [res1, res2];
      })
    )
  ).flat();

  result.forEach(({ name, size, hit, miss, time }) => {
    console.log(
      `${name} w/ size ${size} => hit: ${hit}, miss: ${miss}, hit ratio: ${(
        hit /
        (hit + miss)
      ).toFixed(3)}, time: ${time.toFixed(5)} ms`
    );
  });
}

main();
