import { format } from '@packages/utils'
import { flatten } from 'lodash-es'
import { ref } from "vue"

const count = ref(0)
console.log(count)
console.log(format(new Date()))

const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10]]
console.log(flatten(arr))
