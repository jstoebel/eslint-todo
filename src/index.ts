import readline from 'readline';
import { IFile, IMessage, IFullReport } from 'types';
import fs from 'fs';
import Report from './report';
import util from 'util';

const fileExists = util.promisify(fs.exists);
const fileRead = util.promisify(fs.readFile);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const eslintDotJson = 'eslint-todo.json'


rl.on('line', async (line) => {
    const data = JSON.parse(line);

    const report = new Report();

    data.forEach((file: IFile) => {
        file.messages.forEach((message: IMessage) => {
            report.addMessage(message, file.filePath);
        });
    });

    const output = report.output();

    const todoExists = await fileExists(eslintDotJson)

    if (!todoExists) {
        // early exit when todo does not exist
        writeTodo(output)
        return;
    }

    const prevReport = JSON.parse(await fileRead(eslintDotJson, 'utf-8'));

    // get new errors
    // raise them

    // if no new errors -> :)

    if (report.isWorseThan(prevReport)) {

    }

    // check if report is worse
    // raise erorr if its worse
    // 

    // const todoExists = await fileExists(eslintDotJson)

    // if (todoExists) {
    //     const prevReport = JSON.parse(await fileRead(eslintDotJson, 'utf-8'));

    //     if (report.isWorseThan(prevReport) {
    //         // emmit error
    //     }
    // } else {

    // }
    // does todo exist?
    // yes -> is current worse than older?
    // emit error
    // no -> rewrite todo
    // otherwise

    fs.writeFileSync(eslintDotJson, JSON.stringify(output), 'utf-8');
});


function writeTodo(output: IFullReport): void {
    fs.writeFileSync(eslintDotJson, JSON.stringify(output), 'utf-8');
    console.log('todo saved');

}