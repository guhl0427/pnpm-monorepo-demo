import path from 'node:path';
import {fileURLToPath} from 'node:url'

console.log("import.meta.url", import.meta.url)

const notes = '/users/joe/notes.txt';
const filepath = import.meta.filename;
// const filepath = fileURLToPath(import.meta.url)
console.log("filepath", filepath);
import.meta.dirname

const dirname = import.meta.dirname
// const dirname = path.dirname(filepath); // /users/joe
console.log("dirname", dirname);

const basename = path.basename(filepath); // notes.txt
console.log("basename", basename);

const extname = path.extname(filepath); // .txt
console.log("extname", extname);

const filename = path.basename(filepath, extname); // notes
console.log("filename", filename);


const resolvePath = path.resolve( 'dist', "env")
console.log("resolvePath", resolvePath)

const joinPath = path.join("hello", 'dist', "env")
console.log("joinPath", joinPath)
