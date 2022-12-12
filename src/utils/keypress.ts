const keypress = async (): Promise<void> => {
    const processInput = process.stdin;
    processInput.resume();
    return new Promise<void>(resolve => 
        processInput.on('data', () => {
        resolve();
    })).then(() => {
        processInput.removeAllListeners('data');
    })
}

export default keypress;