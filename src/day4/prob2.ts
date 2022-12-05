import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'

async function run(): Promise<string> {
    //setup
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day4.txt`);
    const response = await puzzleinput;
    const body = await response.text();

    //work
    return `WIP`;
}

export default run;
