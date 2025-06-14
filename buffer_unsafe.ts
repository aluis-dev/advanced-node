/**
 * This in exercise to demostrate how Node.js
 * uses a pool of memory for Buffer allocations.
 * The pool is a shared memory area that can be used
 * to allocate Buffers without needing to request
 * memory from the operating system each time.
 * This can improve performance by reducing the
 * number of system calls and memory fragmentation.
 */

import { Buffer } from 'node:buffer';

const POOL_SIZE = Buffer.poolSize;               // 8192 bytes (8 KiB)
const SMALL_THRESHOLD = POOL_SIZE >>> 1;         // 4096 bytes (4 KiB)

console.log(`POOL_SIZE        = ${POOL_SIZE} bytes`);
console.log(`SMALL_THRESHOLD = ${SMALL_THRESHOLD} bytes`);
console.log('='.repeat(40));

let currentPool: ArrayBuffer | null = null;
let poolCount = 0;
let offset = 0;

function inspectAlloc(size: number, idx: number = 0) {
  const isSmall = size <= SMALL_THRESHOLD;

  const buf = Buffer.allocUnsafe(size);
  const slab = buf.buffer;
  const fromPool = slab.byteLength === Buffer.poolSize;

  // Check if the slab is from the pool
  if(fromPool && slab !== currentPool) {
    currentPool = slab;
    poolCount++;
    offset = 0;
    console.log(`Slab #${poolCount} created: ${slab.byteLength} bytes`);
  }

  const byteOffset = fromPool ? offset : 0;

  if (fromPool) offset += size;

  console.log(
    `size=${size.toString().padEnd(5)} | ` +
    `small? ${isSmall.toString().padEnd(5)} | ` +
    `fromPool? ${fromPool.toString().padEnd(5)} | ` +
    `slabSize=${slab.byteLength.toString().padEnd(5)} | ` +
    `byteOffset=${byteOffset.toString().padEnd(5)}`
  );
}

const bufferSizes = [
  3000,
  3000,
  3000,
  5000,
  3000,
  SMALL_THRESHOLD - 1,
  100,
  4000,
  POOL_SIZE + 10
];

bufferSizes.forEach((sz, i) => inspectAlloc(sz, i+1));
