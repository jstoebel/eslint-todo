import {
  execute
} from './support/cmd';
import fs from 'fs';
import path from 'path';
import mockFs from 'mock-fs';
import util from 'util';
import _ from 'lodash'

const readFile = util.promisify(fs.readFile);

const fixturesPath = './__tests__/support/fixtures';

const errorsPath = path.resolve(fixturesPath, 'errors.txt');
const errorsBetterPath = path.resolve(fixturesPath, 'errors_better.txt')
const errorsWorsePath = path.resolve(fixturesPath, 'errors_worse.txt')

const eslintTodoDotJson = 'eslint-todo.json';
const todoPath = path.resolve(fixturesPath, eslintTodoDotJson);
describe('cli', () => {
  let childProcessResult; // execute handles executing our cli in a child process. It returns a promising resolving to an object which contains if the process was successful and the output message
  afterAll(() => {
    // remove eslint-todo from root directory after each test
    fs.unlinkSync(eslintTodoDotJson);
  });
  describe('no todo found', () => {
    it('creates a todo', async () => {
      const lintResults = fs.readFileSync(errorsPath, 'utf-8');

      const expectedTodo = fs.readFileSync(todoPath, 'utf-8');

      await execute('./build/index.js', [], {
        stdin: lintResults
      });

      const actualTodo = fs.readFileSync(eslintTodoDotJson, 'utf-8');
      expect(actualTodo).toEqual(expectedTodo);
    });
  });

  describe('todo exists', () => {
    describe('all areas pass', () => {
      let childProcessResult;
      beforeEach(async () => {
        /**
         * copy todo to root
         * grab errors.txt -> parse
         * clear out an error type : no-unused-vars -> stringify
         * call cli
         */

        copyTodoToRoot(todoPath)

        const errors = await readFile(errorsBetterPath, 'utf-8');
        const errorsData = JSON.parse(errors);

        childProcessResult = await execute('./build/index.js', [], {
          stdin: JSON.stringify(errorsData)
        });
      })

      xit('exits with 0', async () => {
        expect(childProcessResult.success).toBeTruthy()
      });


      xit('updates todo', () => {

        // const expectedTodo = await readFile(todo)
      });
    });

    describe('some area has more errors', () => {
      beforeEach(async () => {
        copyTodoToRoot(todoPath)

        const errors = await readFile(errorsWorsePath, 'utf-8');

        childProcessResult = await execute('./build/index.js', [], {
          stdin: errors
        });
      })

      it('displays error message', async () => {
        const expectedMsg = [
          'fullOfProblems.js',
          ['2:10', 'error', "'addOne' is defined but never used."].join('\t'),
          '',
          '1 new problem was found.'
        ].join('\n')
        expect(childProcessResult.msg).toEqual(expectedMsg)
      });

      it('exits with 1', async () => {
        expect(childProcessResult.success).toBeFalsy()
      });
    });
  });
});

/**
 * 
 * @param {string} filePath - path of file
 * file is copied to root
 */
function copyTodoToRoot(filePath) {
  fs.copyFile(filePath, eslintTodoDotJson, err => {
    if (err) throw err;
  });
}