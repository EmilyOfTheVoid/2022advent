import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'
import sum from '../utils/sum.js';

async function run(): Promise<string> {
    //setup
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day3.txt`);
    const response = await puzzleinput;
    const body = await response.text();

    //work
    const elves = body.split(/\r\n/);
    const teams = [];

    while (elves.length) {
        teams.push(elves.splice(0, 3));
    }

    const badges = teams.map(([elf1, elf2, elf3]) => {
        const badge = elf1.split('').find((item: string) => isBadge(item, elf2, elf3));
        return findLetterValue(badge);
    });

    return `${sum(badges)}`;
}

const isBadge = (item: string, elf2: string, elf3: string): boolean => {
    return (elf2.indexOf(item) > -1 && elf3.indexOf(item) > -1);
}

const findLetterValue = (character: string): number => {
    const charCode = character.charCodeAt(0);
    if (charCode > 65 && charCode < 91) return charCode - 38;
    return charCode - 96;
}

export default run;
