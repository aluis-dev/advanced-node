import { open } from 'node:fs/promises';

(async () => {
    const fileHandleRead = await open('src.txt', 'r');
    const fileHandleWrite = await open('des.txt', 'w');

    const streamRead = fileHandleRead.createReadStream()
    const streamWrite = fileHandleWrite.createWriteStream();

    let split = ''
    streamRead.on('data', chunk => {
        const numbers = chunk.toString('utf-8').split(' ') as string[];
        if(Number(numbers[0]) !== Number(numbers[1]) - 1) {
            if(split) {
                numbers[0] = split.trim() + numbers[0].trim();
            }
        }

        if(
            Number(numbers[numbers.length - 1]) !==
            Number(numbers[numbers.length - 2]) + 1
        ) {
            split = numbers.pop() as string;
        }

        numbers.forEach((num) => {
            let n = Number(num);

            if(n% 2 === 0) {
               if(!streamWrite.write(`${n} `)) {
                    streamRead.pause();
             }
            }
        })
    })

    streamWrite.on('drain', () => {{
        streamRead.resume();
    }})
})()