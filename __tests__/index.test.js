import {
  execute
} from './support/cmd';

// import path from 'path'

import {
  spawn
} from 'child_process';

describe('cli', () => {
  describe('no todo found', () => {
    it('creates a todo', async () => {

      const output = await execute('./build/index.js', [], {
        stdin: 'hello world'
      })
      console.log(output);

      expect(output).toEqual('hello world')

      // const child = spawn('node', ['./build/index.js']);
      // child.stdin.setEncoding('utf-8');
      // child.stdout.pipe(process.stdout);

      // child.stdin.write("a\nb\nc");

      // child.stdin.end();
      // recieves error output as stdin
      // creates todo
      // exit 0
    });
  });
});