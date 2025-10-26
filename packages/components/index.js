import { format, getTime, debounce } from '@packages/utils'
import { flatten } from 'lodash-es'
import { ref } from "vue"

const argv = process.argv
console.log("argv", argv)
const params = argv.slice(2)
console.log("params", params);

const count = ref(0)
console.log(count)
console.log(format(new Date()))

const arr = [[1,2,3],[4,5,6],[7,8,9,10]]
console.log(flatten(arr))
