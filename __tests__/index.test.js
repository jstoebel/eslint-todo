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

const eslintTodoDotJson = 'eslint-todo.json';
const todoPath = path.resolve(fixturesPath, eslintTodoDotJson);
describe('cli', () => {
  afterAll(() => {
    mockFs.restore();
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
      fs.unlinkSync(eslintTodoDotJson);
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

        fs.copyFile(todoPath, eslintTodoDotJson, err => {
          if (err) throw err;
        });

        const errors = await readFile(errorsBetterPath, 'utf-8');
        const errorsData = JSON.parse(errors);

        const expectedNewTodo = await readFile(todoPath);

        const expectedNewTodoObj = _.transform(JSON.parse(expectedNewTodo), (result, value, key) => {
          if (key === 'no-unused-vars') return;
          result[key] = value;
        }, {})

        childProcessResult = await execute('./build/index.js', [], {
          stdin: JSON.stringify(errorsData)
        });
      })

      it('exits with 0', async () => {
        expect(childProcessResult.success).toBeTruthy()
      });


      it('updates todo', () => {
        
      });
    });

    describe('some area has more errors', () => {
      it('displays error message', () => {
        /**
         * copy todo to root
         * grab errors.txt -> parse
         * increment an error count -> stringify
         * call cli
         */
      });

      it('exists with 1', () => {});
    });
  });
});