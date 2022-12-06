import fetch from 'node-fetch';
import { LOCAL_DOMAIN } from '../config/env.js'

export const getInput = async (inputFile: string) :Promise<string> => {
    const puzzleinput = fetch(`${LOCAL_DOMAIN}/${inputFile}.txt`);
    const response = await puzzleinput;
    return await response.text();
}