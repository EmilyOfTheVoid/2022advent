import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'

async function run(): Promise<number> {
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day1.txt`);
    const response = await puzzleinput;
    
    return response.text().then(body => {
        const segments = body.split(/\r?\n\r?\n/);
        const groups = segments.map(segment => segment.split(/\r?\n/));
        const sums = groups.map(group => group.reduce((acc: number, cur) => (acc + (+cur)), 0));
        const max = Math.max(...sums);
        
        return max;
    });
}

export default run;