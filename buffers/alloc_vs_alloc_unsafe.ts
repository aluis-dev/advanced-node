/**
 * This exercise is to demonstrate how Node.js's
 * buffer allocation works with `Buffer.allocUnsafe()` and
 * `Buffer.alloc()`. The goal is to show the speed and
 * memory usage differences between these two methods.
 */

import { Buffer } from 'node:buffer';

console.log('='.repeat(40));

const ITERATIONS = 1000;
const sizes = [
    { name: '1KiB', size : 1024 },
    { name: '64KiB', size : 64 * 1024 },
    { name: '8MiB', size : 8 * 1024 * 1024 },
]

function runTest(fn: () => void, label: string) {
    global.gc && global.gc();
    const memBefore = process.memoryUsage().heapUsed;
    console.time(label);
    for (let i = 0; i < ITERATIONS; i++) {
        fn();
    }
    console.timeEnd(label);
    const memAfter = process.memoryUsage().heapUsed;

    console.log(`${label} memory usage: ${(memAfter - memBefore) / 1024} KiB`);
}

sizes.forEach(({ name, size }) => {
  console.log(`--- Tamaño: ${name} (${size} bytes) ---`);

  // Buffer.alloc
  runTest(
    () => {
      const b = Buffer.alloc(size);
       if (b[0] !== 0) throw new Error('Buffer no inicializado a cero');
    },
    `alloc          ${name}`
  );

  // Buffer.allocUnsafe
  runTest(
    () => {
      const b = Buffer.allocUnsafe(size);
    },
    `allocUnsafe    ${name}`
  );
})