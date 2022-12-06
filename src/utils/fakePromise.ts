export const testPromise = (): Promise<string> => {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve('test');
        }, 1);
    })
}