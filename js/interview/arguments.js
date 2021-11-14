function sum() {
    const args = [...arguments]
    console.log([...arguments])
    const fn = function() {
        const newArgs = [...arguments]
        return sum.apply(null, args.concat(newArgs))
    }
    
    fn.valueOf = function() {
        return args.reduce((res, item) => {
            return res + item
        }, 0)
    }

    return fn
}

console.log(sum(1, 2, 3).valueOf())
console.log(sum(1)(2)(3).valueOf())


