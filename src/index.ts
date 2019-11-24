import readline from 'readline';

// console.log(
//     'hello from index'
// );

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

rl.on('line', (line) => {
    process.stdout.write(line);
})