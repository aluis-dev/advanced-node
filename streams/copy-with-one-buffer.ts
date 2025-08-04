import { readFile, open } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * This script demonstrates copying a file using a single buffer in Node.js.
 * It reads the entire content of the source file into memory and writes it to the destination file.
 * This approach is suitable for smaller files where memory usage is not a concern.
 * First execute `write.ts` to create `src.txt` with 500,000 numbers.
 * Time: 3.466ms
 * Memory: 3.4MB
 */
(async () => {
    console.time('Copy file with one buffer');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const destFilePath = path.join(__dirname, 'copied-since-buffer.txt');
    const srcFilePath = path.join(__dirname, 'src.txt');

    const destFile = await open(destFilePath, 'w');
    const result = await readFile(srcFilePath, { encoding: 'utf-8' });
    await destFile.write(result);
    console.timeEnd('Copy file with one buffer');
})()
