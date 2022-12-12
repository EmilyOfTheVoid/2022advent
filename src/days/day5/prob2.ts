import { readInput } from '../../utils/puzzle.js';

async function run(): Promise<string | number> {
    //setup
    const input = await readInput('day5');
    const [rawCrateData, rawOperationData] =  input.split(/\r?\n\r?\n/);

    const stackMap = parseStacks(rawCrateData);
    const operations = rawOperationData.split(/\r?\n/);

    while(operations.length) {
        const [quantity, fromRef, toRef] = parseInstructions(operations.shift());     
        moveItems(+quantity, stackMap[fromRef], stackMap[toRef]);
    }

    return Object.values(stackMap).map((stack) => stack[stack.length - 1]).join('');
}

const parseStacks = (stackData: string) => {
    const rawStackData = stackData.split(/\r?\n/);
    const rawRow = rawStackData.pop();
    const refRow = rawRow.trim().split(/ */); // to avoid hard coding
    const refRowIndex = refRow.map(ref => rawRow.indexOf(ref));
    const stacks: {[key: number]: string[]} = {};

    while(rawStackData.length) {
        const bottomOfStack = rawStackData.pop();
        for(let i = 0; i < refRow.length; i++) {
            if(!stacks[refRow[i]]) stacks[refRow[i]] = [];
            const crate = bottomOfStack[refRowIndex[i]].trim();
            crate && stacks[refRow[i]].push(crate);
        }
    };

    return stacks;
}

const parseInstructions = (operation: string): string[] => {
    return operation.split(/[^0-9]+/).filter(data => data);
} 

const moveItems = (quantity: number, fromStack: string[], toStack: string[]): void => {
    const crates = fromStack.splice(fromStack.length - quantity);
    toStack.splice(toStack.length, 0, ...crates);
}

export default run;
