
const DEFAULT = ()=>{}

export default function (fn, ...defArgs) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...defArgs, ...args, function (err, val) {
        return err ? reject(err) : resolve(val)
      })
    })
  }
}