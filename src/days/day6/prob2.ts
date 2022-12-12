import { readInput } from '../../utils/puzzle.js';

async function run(): Promise<string | number> {
    const data = await readInput('day6');
    const markerLength = 14;
    let i = markerLength;
    while(i < data.length) {
        const segment = data.slice(i - markerLength, i);
        if(!hasDupe(segment)) break;
        i++
    }
    
    return i;
}

const hasDupe = (chars: string): boolean => {
    const marker = new Set([...chars]);
    return marker.size < chars.length;
}

export default run;
