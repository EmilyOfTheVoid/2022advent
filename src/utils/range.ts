const range = (lastNumber: number, firstNumber: number = 0): number[] => {
    return Array.from(new Array(lastNumber - firstNumber), (x, i) => i + firstNumber + 1);
};

export default range;