import { readInput } from '../utils/puzzle.js'
import sum from '../utils/sum.js';

async function run(): Promise<string | number> {
    // setup
    const input = await readInput('day7');
    const traverseInput = '$ cd ';
    
    // parse
    const lines = input.split(/\r?\n/);
    const dirs = {};
    let currentAddress = '';
    while(lines.length) {
        const line = lines.shift();
        if (line.indexOf(traverseInput) > -1) {
            const command = line.slice(traverseInput.length);
            currentAddress = traverse(currentAddress, command);
            if(!dirs[currentAddress]) dirs[currentAddress] = [];
            continue;
        }
        const fileSize = line.match(/^\d+/g);
        if(!fileSize) continue;
        dirs[currentAddress] = [].concat(dirs[currentAddress], fileSize);
    }

    // work
    const dirNames: string[] = Object.keys(dirs);
    return dirNames.reduce((acc: number, cur: string): number => {
        const toExpand = [cur];
        const expanded = [];
        while(toExpand.length) {
            const thisItem = toExpand.shift();
            const content = shallowContent(thisItem, dirs);
            content.forEach(item => toExpand.push(item));
            expanded.push(thisItem);
        }
        const expandedValues = expanded.map(key => dirs[key]);
        const size = sum([].concat(...expandedValues));
        return (size > 100000) ? acc : acc + size;
    }, 0)
};

const shallowContent = (fileName: string, dirs: Object ): string[] => {
    const fileNames = Object.keys(dirs);
    return fileNames.filter(address => address !== fileName && address.indexOf(fileName) === 0);
}

const traverse = (address: string, command: string): string => {
    const fileMarker = '/';
    const navUp = '..';
    if(command === navUp) {
        return address.slice(address.lastIndexOf(fileMarker));
    }
    if(command === fileMarker) {
        return fileMarker;
    }
    return address + command + fileMarker;
}

export default run;

