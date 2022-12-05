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
        choices: ["Day 1", "Day 2", "Day 3", "Day 4"]
    },
];

const handler = async (answers: Answer) => {
    let answer1: string = 'not yet done';
    let answer2: string = 'not yet done';
    switch (answers.day) {
        case 'Day 1': {
            const { default: run1 } = await import('./day1/prob1.js');
            answer1 = await run1();
            const { default: run2 } = await import('./day1/prob2.js');
            answer2 = await run2();
            break; 
        }
        case 'Day 2': {
            const { default: run1 } = await import('./day2/prob1.js');
            answer1 = await run1();
            const { default: run2 } = await import('./day2/prob2.js');
            answer2 = await run2();
            break; 
        }
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
