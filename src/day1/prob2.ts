import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'
import sum from '../utils/sum.js';

async function run(): Promise<string> {
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day1.txt`);
    const response = await puzzleinput;
    return response.text().then(body => {
        const segments = body.split(/\r?\n\r?\n/);
        const groups = segments.map(segment => segment.split(/\r?\n/));
        const sums = groups.map(group => sum(group));
        const sortedList = sums.sort((a, b) => {return b - a});

        return `${sum(sortedList.slice(0, 3))}`;
    });
}

export default run;