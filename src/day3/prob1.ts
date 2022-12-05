import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'
import sum from '../utils/sum.js';

async function run(): Promise<string> {
    //setup
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day3.txt`);
    const response = await puzzleinput;
    const body = await response.text();

    //work
    const rucksacks = body.split(/\r\n/);
    const misplacedItems = rucksacks.map(sack => {
        const pocketSize = sack.length/2;
        const pockets: [string, string] = [sack.slice(0, pocketSize), sack.slice(pocketSize)];
        const [pocket1, pocket2] = pockets;        
        const misplacedItem = pocket1.split('').find((item: string) => isMisplacedItem(item, pocket2));
        return findLetterValue(misplacedItem);
    });
    return `${sum(misplacedItems)}`;
}

const isMisplacedItem = (item: string, otherPocket: string): boolean => {
    return otherPocket.indexOf(item) > -1;
}

const findLetterValue = (character: string): number => {
    const charCode = character.charCodeAt(0);
    if (charCode > 65 && charCode < 91) return charCode - 38;
    return charCode - 96;
}

export default run;
