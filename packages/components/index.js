import { format, getTime, debounce } from '@packages/utils'
import { flatten } from 'lodash-es'
import { ref } from "vue"
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from "node:fs/promises"
// import fs from "node:fs"

const argv = process.argv
console.log("argv", argv)
const params = argv.slice(2)
console.log("params", params);

const count = ref(0)
console.log(count)
console.log(format(new Date()))

const arr = [[1,2,3],[4,5,6],[7,8,9,10]]
console.log(flatten(arr))

console.log("import.meta.url", import.meta.url)
const __filepath = fileURLToPath(import.meta.url)
console.log("filepath", __filepath);

const indexUrl = new URL("index.js", import.meta.url)
console.log("indexUrl", indexUrl);
fs.readFile(indexUrl, "utf-8").then((data) => {
  console.log("index.js content", data)
})

const __dirname = path.dirname(__filepath)
console.log("dirname", __dirname);

