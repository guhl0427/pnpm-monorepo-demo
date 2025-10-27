import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from "node:fs/promises"
// import fs from "node:fs"

const argv = process.argv
console.log("argv", argv)
const params = argv.slice(2)
console.log("params", params);

const __filepath = fileURLToPath(import.meta.url)
console.log("filepath", __filepath)

const __dirname = path.dirname(__filepath)
console.log("dirname", __dirname)

const fileUrl = new URL("../test.txt", import.meta.url)
console.log("fileUrl", fileUrl)
fs.readFile(fileUrl, "utf-8").then((data) => {
  console.log("test.txt content", data)
})

console.log("process.cwd", process.cwd());
const indexPath = path.resolve(process.cwd(), "./src")
console.log("indexPath", indexPath)