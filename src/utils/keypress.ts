const keypress = async (): Promise<void> => {
    const processInput = process.stdin;
    processInput.resume();
    return new Promise(resolve => 
        processInput.on('data', () => {
        resolve();
    }))
}

export default keypress;