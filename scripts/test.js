const { exec } = require('child_process');
const { EOL } = require('os');
const c = require('ansi-colors');

class CommandRunner {
  constructor(commands) {
    this.commands = commands;
    this.currentIdx = 0;
    this.nbCommands = this.commands.length;
  }

  displayCmd(cmd) {
    if (this.currentIdx > 0) {
      console.log(''); // This will add a newline.
    }
    // console.log(`${c.blue.bold('Running')} ${c.blue.bold(`${this.currentIdx + 1}/${this.nbCommands}`)}${EOL}${c.blue.bold('> ')}${cmd}${EOL}`);
    console.log(`${c.blue.bold('Running task')} ${c.blue.bold((this.currentIdx + 1) + '/' + this.nbCommands)}${EOL}${c.blue.bold('> ')}${cmd}${EOL}`);
  }

  run() {
    const currentCommand = this.commands[this.currentIdx];
    this.displayCmd(currentCommand.cmd);
    const process = exec(currentCommand.cmd);
    if (currentCommand.output === 'stream') {
      process.stdout.on('data', (chunk) => {
        currentCommand.stdoutOnData(chunk);
      });
      process.stderr.on('data', (chunk) => {
        console.log(c.red(chunk.toString('utf8').trim()));
      });
      process.on('error', (err) => {
        console.log(c.red('Failed to start task process.', err));
      });
      process.on('close', (code) => {
        if (code !== 0) {
          console.log(c.red(`Child process exited with code ${code}`));
        }
        process.stdin.end();
      });
    }

    if (currentCommand.output === 'string') {
      const process = exec(currentCommand.cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(c.red(error));
          return;
        }
        if (stdout) {
          currentCommand.stdoutFn(stdout);
        }
        if (stderr) {
          console.log(c.red(stderr));
        }
      });
      process.on('close', () => {
        this.currentIdx++;
        if (this.commands[this.currentIdx]) {
          this.run();
        }
      });
    }
  }
}

const commands = [
  {
    cmd: 'adb devices -l',
    output: 'string',
    stdoutFn: (stdout) => {
      const getDeviceName = (adbDeviceLine) => {
        return adbDeviceLine.split('device:')[1];
      };
      const outputLines = stdout.split(EOL);
      if (outputLines[1] === '') {
        console.log(c.red.bold('⚠️  WARNING: no device found!⚠️'));
        console.log(c.yellow.bold('Connect a device soon or the APK will not be deployed!'));
      } else {
        let firstDevice;
        outputLines.forEach((line, idx) => {
          if (line !== '') {
            let icon = '';
            if (idx > 0) {
              icon = '📱  ';
              if (!firstDevice) {
                firstDevice = getDeviceName(line);
              }
            }
            console.log(`${icon}${line}`);
          }
        });
        if (firstDevice) {
          console.log(EOL + c.white.bold('💡  APK will be deployed to') + ' ' + c.yellow(firstDevice) + c.white.bold('.'));
        }
      }
    }
  },
  {
    cmd: 'ionic cordova run android --device --livereload',
    output: 'stream',
    stdoutOnData: (chunk) => {
      let str = chunk.toString('utf8').trim();
      if (str.startsWith('>')) {
        str = c.green(str);
      } else {
        if (str.startsWith('[INFO]')) {
          str = c.whiteBright(str);
        } else {
          if (str.startsWith('[')) {
            str = c.gray(str);
          }
        }
      }
      console.log(str);
    }
  }
];

const task = new CommandRunner(commands);
task.run();
