import { readInput } from '../utils/puzzle.js'

class File {
    readonly fileName: string;
    readonly fileSize: number;

    constructor(name: string, fileSize: number) {
        this.fileName = name;
        this.fileSize = fileSize;
    }
}

class Directory {
    readonly dirName: string;
    readonly parent: Directory;
    readonly children: Map<string, Directory> = new Map<string, Directory>();
    readonly files: Map<string, File> = new Map<string, File>();

    constructor(name: string, parent: Directory) {
        this.dirName = name;
        this.parent = parent;
    }

    public addFile(fileName: string, fileSize: number): void {
        this.files.set(fileName, new File(fileName, fileSize));
    }

    public addDir(name: string): Directory {
        const existingChild = this.children.get(name);
        if(existingChild) return existingChild;
        const newChild = new Directory(name, this);
        this.children.set(name, newChild);
        return newChild;
    }

    public totalFileSize(): number {
        const localFiles = Array.from(this.files.values()).reduce((acc, cur) => {
            return acc + cur.fileSize
        }, 0);

        const childFiles = Array.from(this.children.values()).reduce((acc, cur) => {
            return acc + cur.totalFileSize();
        }, 0);

        return localFiles + childFiles;
    }
}

async function run(): Promise<string | number> {
    // setup
    const input = await readInput('day7');
    const traverseInput = '$ cd ';
    
    // parse
    const lines = input.split(/\r?\n/);
    let baseDir: Directory = new Directory('/', null);
    let currentDir: Directory = baseDir;
    const allDirs: Directory[] = [];

    while(lines.length) {
        const line = lines.shift();
        if (line.indexOf(traverseInput) > -1) {
            const command = line.slice(traverseInput.length);
            currentDir = traverse(command, currentDir, baseDir);
            if(allDirs.indexOf(currentDir) === -1) allDirs.push(currentDir);
            continue;
        }
        if(line.search(/^\d+/g) === -1) continue;
        const [fileSize, fileName] = line.split(' ');
        currentDir.addFile(fileName, +fileSize);
    }

    // work
    return allDirs.reduce((acc, cur) => {
        const curSize = cur.totalFileSize();
        return curSize > 100000 ? acc :  curSize + acc;
    }, 0);
};

const traverse = (command: string, currentDir: Directory, baseDir: Directory): Directory => {
    const fileMarker = '/';
    const navUp = '..';
    if(command === navUp) return currentDir.parent ? currentDir.parent : baseDir;
    if(command === fileMarker) return baseDir;
    return currentDir.addDir(command);
}

export default run;

