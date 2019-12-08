import {
  spawn
} from 'child_process';
import concat from 'concat-stream';

function createProcess(processPath, args = [], opts = {}) {
  const concatedArgs = [processPath].concat(args);

  const child = spawn('node', concatedArgs, opts);

  child.stdin.write(opts.stdin);

  child.stdin.end();

  return child
}

export function execute(processPath, args = [], opts = {}) {
  const defaultOptions = {
    env: process.env,
    cwd: process.cwd(),
    stdin: '',
  };

  const mergedOptions = Object.assign(defaultOptions, opts);
  const childProcess = createProcess(processPath, args, mergedOptions);

  childProcess.stdin.setEncoding('utf-8');

  const promise = new Promise((resolve, reject) => {

    let msg;
    childProcess.stderr.once('data', err => {
      msg = err.toString()
      // reject({msg: err.toString(), success: false});
    });

    // childProcess.on('error', reject);

    childProcess.stdout.pipe(
      concat(result => {
        msg = result.toString();
        // resolve();
      })
    );

    childProcess.on('close', () => {
      resolve({
        msg,
        success: true
      })
    })

    childProcess.on('error', () => {
      reject({
        msg,
        success: false
      })
    })
  });

  return promise;
}