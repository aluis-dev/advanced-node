import { open } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

const TOTAL_OF_WRITE = 500_000;

/**
 * This script demonstrates writing a large amount of data to a file using Node.js streams.
 * It uses `Buffer` to create data chunks and writes them to a file in a non-blocking manner.
 * The script handles backpressure by listening for the 'drain' event on the stream.
 */

(async() => {
    console.time('Write to file');
    const fileHandle = await open('src.txt', 'w');
    const stream = fileHandle.createWriteStream();

    let i = 0;
    const writeData = () => {
        while(i < TOTAL_OF_WRITE) {
            const buff = Buffer.from(`${i} `, "utf-8");

            const isTheLastWrite = i === TOTAL_OF_WRITE - 1;
            
            if(isTheLastWrite) return stream.end(buff);
            if(!stream.write(buff)) break;
            i++;
        }
    }

    writeData();

    stream.on('drain', () => {
        console.log('Stream drained, continuing to write...');
        writeData();
    });
    stream.on('finish', () => {
        console.log('All data written successfully.');
        console.timeEnd('Write to file');
        fileHandle.close();
    }
    );
    stream.on('error', (err) => {
        console.error('Error writing to stream:', err);
        fileHandle.close();
    }
    );
    stream.on('close', () => {
        console.log('Stream closed.');
    }
    );
})()