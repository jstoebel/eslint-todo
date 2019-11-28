import {
  execute
} from './support/cmd';
import fs from 'fs'
import path from 'path'
import mockFs from 'mock-fs'

import {
  spawn
} from 'child_process';

const fixturesPath = './__tests__/support/fixtures'
describe('cli', () => {

  afterAll(() => {
    mockFs.restore()
  })
  describe('no todo found', () => {
    it('creates a todo', async () => {

      const lintResults = fs.readFileSync(
        path.resolve(fixturesPath,
          'errors.txt'),
        'utf-8'
      );

      const expectedTodo = fs.readFileSync(
        path.resolve(fixturesPath,
          'todo.yml'),
        'utf-8'
      );

      mockFs();

      await execute('./build/index.js', [], {
        stdin: lintResults
      });

      const actualTodo = fs.readFileSync('eslint-todo.yml', 'utf-8')
      expect(actualTodo).toEqual(expectedTodo);
    });
  });
});