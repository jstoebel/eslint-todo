import {
  execute
} from './support/cmd';
import fs from 'fs'
import path from 'path'
import mockFs from 'mock-fs'

const fixturesPath = './__tests__/support/fixtures'

const errorsPath = path.resolve(fixturesPath, 'errors.txt')
const eslintTodoDotJson = 'eslint-todo.json'
const todoPath = path.resolve(fixturesPath, eslintTodoDotJson)
describe('cli', () => {

  afterAll(() => {
    mockFs.restore()
  })
  describe('no todo found', () => {
    it('creates a todo', async () => {

      const lintResults = fs.readFileSync(
        errorsPath,
        'utf-8'
      );


      const expectedTodo = fs.readFileSync(
        todoPath,
        'utf-8'
      );

      // mockFs();

      await execute('./build/index.js', [], {
        stdin: lintResults
      });

      const actualTodo = fs.readFileSync(eslintTodoDotJson, 'utf-8')
      expect(actualTodo).toEqual(expectedTodo);
      fs.unlinkSync(eslintTodoDotJson)
    });
  });
});