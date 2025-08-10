import path from 'node:path';
import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';



(async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const destFilePath = path.join(__dirname, 'copied-since-pipe.txt');
    const srcFilePath = path.join(__dirname, 'src.txt');

    const srcFile = await open(srcFilePath, 'r');
    const destFile = await open(destFilePath, 'w');

    const streamRead = srcFile.createReadStream();
    const streamWrite = destFile.createWriteStream();
    streamRead.pipe(streamWrite);
})()