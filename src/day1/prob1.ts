import { readInput } from '../utils/puzzle.js';

async function run(): Promise<number> {
    const body = await readInput('day1');
    
    const segments = body.split(/\r?\n\r?\n/);
        const groups = segments.map(segment => segment.split(/\r?\n/));
        const sums = groups.map(group => group.reduce((acc: number, cur) => (acc + (+cur)), 0));
        const max = Math.max(...sums);
        
        return max;
}

export default run;