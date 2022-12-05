import express from 'express';
import inquirer from 'inquirer';
import Answer from './models/Answer.js';
import clear from 'clear';
import chalk from 'chalk';
import keypress from './utils/keypress.js';

// run cli
const questions = [
    {
        name: 'day',
        message: 'what day do you want to run?',
        type: 'list',
        choices: Array.from(new Array(24), (x, i) => i+1)
    },
];

const handler = async (answer: Answer) => {
    let answer1: string;
    let answer2: string;

    const problem1Filename = `./day${answer.day}/prob1.js`;
    const problem2Filename = `./day${answer.day}/prob2.js`;
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

    console.log(chalk.blue.bold(answer1));
    console.log(chalk.blue.bold(answer2));
    await keypress();
    startInquirer();
}

const startInquirer = () => {
    clear();
    inquirer.prompt(questions)
        .then(handler)
        .catch(() => console.log('uh oh! something went wrong!'));
}


// file server
const app = express();
app.use(express.static('assets'))
app.listen(1337, () => { 
    console.log('listening on port 1337!');
    startInquirer();
 });
