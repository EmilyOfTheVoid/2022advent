import { readInput } from '../utils/puzzle.js';
import sum from '../utils/sum.js';

async function run(): Promise<string> {
    const body = await readInput('day1');
    const segments = body.split(/\r?\n\r?\n/);
    const groups = segments.map(segment => segment.split(/\r?\n/));
    const sums = groups.map(group => sum(group));
    const sortedList = sums.sort((a, b) => {return b - a});

    return `${sum(sortedList.slice(0, 3))}`;
}

export default run;