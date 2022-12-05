import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'

async function run(): Promise<string> {
    //setup
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/day4.txt`);
    const response = await puzzleinput;
    const body = await response.text();

    //work
    const elfPairs = body.split(/\r\n/);
    const elfPairsWithFullyContainedAssignments = elfPairs.map((pair: string) => {
        const pairAssignments = pair.split(',')
        const pairRanges: [number, number][] = pairAssignments.map(assignment => {
            const assignmentRange = assignment.split('-');
            return [+assignmentRange[0], +assignmentRange[1]]
        });
        
        return assignmentsOverlap(pairRanges[0], pairRanges[1]);
    });

    const numberOfContainedAssignments = elfPairsWithFullyContainedAssignments.reduce((acc, val): number => {
        return val ? acc + 1 : acc;
    }, 0);
    return `${numberOfContainedAssignments}`;
}

const assignmentsOverlap = (elf1Assignments: [number, number], elf2Assignments: [number, number]): boolean => {
    return !(elf1Assignments[1] < elf2Assignments[0] || (elf1Assignments[0] > elf2Assignments[1]));
 }

export default run;
