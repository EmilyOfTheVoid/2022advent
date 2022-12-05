const sum = (arrayItems: any): number => {
    return arrayItems.reduce((acc: number, cur: string | number) => (acc + (+cur)), 0);
};

export default sum;