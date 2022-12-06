import { readInput } from '../utils/puzzle.js';

async function run(): Promise<string | number> {
    const data = await readInput('day6');
    const markerLength = 14;
    const marker = new Set();
    let i = markerLength - 1;
    while (marker.size < markerLength && i < data.length) {
        i++
        marker.clear();
        const set = data.slice(i-markerLength, i);
        set.split('').map(a => marker.add(a));
    }

    //work
    return i;
}

export default run;
