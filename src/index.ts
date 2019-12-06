import readline from 'readline';
import {IFile} from 'types'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

rl.on('line', (line) => {
    const data = JSON.parse(line)

    const errorCollection = new errorCollection();

    data.forEach((file: IFile) => {
        const file = new File(file.filePath)


    })
})