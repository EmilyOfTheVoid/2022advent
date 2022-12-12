import inquirer from 'inquirer';
import Answer from './models/Answer.js';
import clear from 'clear';
import chalk from 'chalk';

//utils
import keypress from './utils/keypress.js';
import range from './utils/range.js';
import {ascii, asciiSmall} from './utils/ascii.js';

// run cli
const questions = [
    {
        name: 'day',
        message: 'what day do you want to run?',
        type: 'list',
        choices: range(24),
        default: 7
    },
];

const handler = async (answer: Answer) => {
    let answer1: string;
    let answer2: string;

    const problem1Filename = `./days/day${answer.day}/prob1.js`;
    const problem2Filename = `./days/day${answer.day}/prob2.js`;

    try {
        const { default: run1 } = await import(problem1Filename);
        answer1 = await run1();
    } catch(e) {
        answer1 = 'not yet started';
    }

    try {
        const { default: run2 } = await import(problem2Filename);
        answer2 = await run2();
    } catch(e) {
        answer2 = 'not yet started';
    }

    asciiSmall(`Problem 1`);
    console.log(chalk.green.bold(`  ${answer1}`));
    asciiSmall(`Problem 2`);
    console.log(chalk.green.bold(`  ${answer2}`));

    await keypress();
    startInquirer();
}

const startInquirer = async () => {
    clear();
    ascii('Advent of Code');
    
    inquirer.prompt(questions)
        .then(handler)
        .catch(() => console.log('uh oh! something went wrong!'));
}

startInquirer();