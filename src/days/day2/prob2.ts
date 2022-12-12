import { readInput } from '../../utils/puzzle.js';
import sum from '../../utils/sum.js';

async function run(): Promise<string> {
    //setup
    const body = await readInput('day2');

    //work
    const matches = body.split(/\r\n/);
    const points: [number, number][] = matches.map(match => {
        const pairs = match.split(/ /);
        
        if (pairs.length !== 2) throw new Error('bad input');

        const matchup: [number, number] = [theirValues[pairs[0]], victoryConditions[pairs[1]]];
        const suggestedSelection: number = battleMap[matchup[0]][matchup[1]];

        return [suggestedSelection, matchup[1]];
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

const victoryConditions = {
    X: 0,
    Y: 3,
    Z: 6,
};

const battleMap = {
    1: {
        0: 3,
        3: 1,
        6: 2,
    },
    2: {
        0: 1,
        3: 2,
        6: 3,
    },
    3: {
        0: 2,
        3: 3,
        6: 1,
    }
};


export default run;