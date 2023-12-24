// console.log(global);
// console.log(process);

// process.env.HELLO = 'HELLO';
// console.log(process.env);
// console.log(process.argv);
// console.log(process.cwd());
// console.log(__dirname);
// console.log(__filename);
// process.exit();

const { program } = require('commander');
const fs = require('fs').promises;
const readline = require('readline');
require('colors');

// using arguments: `node index.js -f <name of the log file>`
// <type> - show error hint
// third argument - default log file name
program.option('-f, --file [type]', 'file for saving game logs', 'game_result.log');
program.parse(process.argv);

// console.log(program.opts());

// create readline interface to interact with user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// example of using readline
// rl.on('line', (txt) => {
//   console.log('||=============>>>>>>>>>>>');
//   console.log(txt);
//   console.log('<<<<<<<<<<<=============||');

//   process.exit();
// });

/** Counter of user attempts */
let counter = 0;

/** Guessed number, from 1 to 10 */
const mind = Math.ceil(Math.random() * 10);

/** Path to the log file */
const logFile = program.opts().file;

/**
 * Logger to write into the log file
 *
 * @param {string} msg - message to write
 * @returns {Promise<void>}
 */
const logger = async (msg) => {
  try {
    await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')}: ${msg}\n`);

    console.log(msg.magenta);
    console.log(`Saved game results to the log file ${logFile}`.yellow);
  } catch (err) {
    console.log(`Something went wrong.. ${err.message}`.red);
  }
};

/**
 * Simple input value validation
 * @author Sergii
 *
 * @param {number} num - value to check
 * @returns {boolean}
 */
const isValid = (num) => {
  if (!Number.isNaN(num) && num > 0 && num <= 10) return true;

  if (Number.isNaN(num)) console.log('Please, enter a number!'.red);
  if (num < 1 || num > 10) console.log('Number should be between 1 and 10!'.red);

  return false;
};

/**
 * Main game process
 *
 * @author Sergii
 */
const game = () => {
  rl.question('Please, enter any whole number from 1 to 10!\n'.green, (val) => {
    // convert value to number
    // const num = Number(val);
    const num = +val;

    // validate number
    if (!isValid(num)) return game();

    // counter = counter + 1;
    // counter += 1;
    counter++;

    // if number !== mind
    if (num !== mind) {
      console.log('Oh no!!! Try again..'.red);

      return game();
    }

    // if number === mind
    logger(`Congratulations!! You guessed the number in ${counter} step(s) :]`);

    // process.exit();
    rl.close();
  });
};

// launch the game!
game();
