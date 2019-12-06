import readline from 'readline';
import { IFile, IMessage } from 'types';
import Report from 'report';
import YAML from 'json2yaml';

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

  // save data to file
});
