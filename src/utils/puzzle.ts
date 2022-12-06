import { promises } from 'fs'

const readInput = async (inputFile: string): Promise<string> => {
    const data = await promises.readFile(`./assets/${inputFile}.txt`);
    return data.toString();
}

export { readInput };