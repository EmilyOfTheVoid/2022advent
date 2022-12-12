import { readInput } from '../../utils/puzzle.js'

async function run(): Promise<string | number> {
    //setup
    const input = await readInput('day8');
    
    //parse
    const rows = input.split(/\r?\n/);
    const origAxis: number[][] = Array.from(Array(rows[0].length), () => []);
    const flippedAxis: number[][] = Array.from(Array(rows.length), () => []);
    let x = 0;
    while(rows.length) {
        let y = 0;
        const row = rows.shift().split('');
        console.log(row);
        while(row.length) {
            const tree = +row.shift();
            console.log(tree);
            origAxis[x].push(tree);
            flippedAxis[y].push(tree);
            y++;
        }
        x++;
    }
    console.log(origAxis);
    console.log(flippedAxis);

    //work
    return 'WIP'
}


export default run;
