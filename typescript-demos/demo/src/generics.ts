// 泛型实例

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const res = swap([1, '2'])

// 约束泛型
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr([1, 2, 3])

interface WithLength {
  length: number
}

function echoWithLength<T extends WithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = echoWithLength('str')

// 类使用泛型
class Queue<T> {
  private data: T[] = [];
  push(item: T): void {
    this.data.push(item)
  }
  pop(): T | undefined {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue?.pop()?.toFixed())

// 泛型接口
interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = { key: 123, value: 'str' }
let kp2: KeyPair<string, number> = { key: 'str', value: 123 }

let arr: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// 泛型函数
const add: (x: number, y: number) => number = (x: number, y: number): number => {
  return x + y
}
// 使用 interface 改写
interface IPlus {
  (a: number, b: number) : number
}
function plus(a: number, b: number) : number {
  return a + b
}
const a2: IPlus = plus
// 使用 interface 泛型改写
interface YPlus<T> {
  (a: T, b: T) : T
}
const a3: YPlus<number> = plus
