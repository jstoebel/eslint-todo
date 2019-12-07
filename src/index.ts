import readline from 'readline';
import { IFile, IMessage } from 'types';
import fs from 'fs';
import Report from './report';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  const data = JSON.parse(line);

  const report = new Report();

  data.forEach((file: IFile) => {
    file.messages.forEach((message: IMessage) => {
      report.addMessage(message, file.filePath);
    });
  });

  const output = report.output();
  fs.writeFileSync('eslint-todo.json', JSON.stringify(output), 'utf-8');
});
