const path = require('node:path')
// const __dirname = path.dirname(__filename)
console.log("__dirname", __dirname);
console.log("__filename", __filename);

const join = path.join(__dirname, 'src', 'index.js')
console.log("join", join);

const resolve = path.resolve(__dirname, 'src', 'index.js')
console.log("resolve", resolve);
