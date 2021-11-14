
function format(val, deep = 1) {
  let res = ''
  if (val === '') {
      return `""`
  }
  if (typeof val === 'number') {
      return val
  }
  if (typeof val === 'string') {
      return `"${val}"`
  }
  if (Array.isArray(val)) {
      res += `[`
      val.forEach(item => {
          res += `\n${space(deep)}${format(item, deep + 1)},`
      })
      res = res.slice(-1) === ',' ? res.slice(0, -1) : res
      res += `\n${space(deep - 1)}]`
      return res
  }
  if (typeof val === 'object') {
      res += `{`
      for (let key in val) {
          res += `\n${space(deep)}"${key}": ${format(val[key], deep + 1)},`
      }
      res = res.slice(-1) === ',' ? res.slice(0, -1) : res
      res += `\n${space(deep)}}`
      return res
  }
  return res
}

function space(deep = 1) {
  if (deep <= 0) {
      return ``
  }
//   return new Array(deep).fill('  ').join('')
  return ' '.repeat(deep)
}

const test = [1, 2,3,[5, 6, [7], '']]

console.log(format(test))