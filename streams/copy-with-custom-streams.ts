import { open } from 'node:fs/promises';

(async () => {
    const srcFile = await open('src.txt', 'r');
    const destFile = await open('copied-with-custom-buffer.txt', 'w');

    let bytesRead = -1;
    while(bytesRead !== 0) {
        const readResult = await srcFile.read();
        bytesRead = readResult.bytesRead;

        if(bytesRead !== 16384) {
            const indexNotFilled = readResult.buffer.indexOf(0);
            const buff = Buffer.alloc(indexNotFilled);
            readResult.buffer.copy(buff, 0, 0, indexNotFilled);
            destFile.write(buff);
            continue;
        }
        destFile.write(readResult.buffer);
    }
})();
