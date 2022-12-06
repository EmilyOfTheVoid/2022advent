import { readInput } from '../utils/puzzle.js';
import sum from '../utils/sum.js';

async function run(): Promise<string> {
    //setup
    const body = await readInput('day2');

    //work
    const matches = body.split(/\r\n/);
    const points: [number, number][] = matches.map(match => {
        const pairs = match.split(/ /);
        
        if (pairs.length !== 2) throw new Error('bad input');

        const attempt: [number, number] = [theirValues[pairs[0]], myValues[pairs[1]]];
        const myScore: number = battleMap[attempt[1]][attempt[0]];
        return [attempt[1], myScore];
    });
    const myScore = points.reduce((acc, val) => {
        return acc + sum(val);
    }, 0)
    return `${myScore}`;
}

const theirValues = {
    A: 1,
    B: 2,
    C: 3,
};

const myValues = {
    X: 1,
    Y: 2,
    Z: 3,
};

const battleMap = {
    1: {
        1: 3,
        2: 0,
        3: 6,
    },
    2: {
        1: 6,
        2: 3,
        3: 0,
    },
    3: {
        1: 0,
        2: 6,
        3: 3,
    }
};


export default run;