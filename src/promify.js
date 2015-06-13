
const DEFAULT = ()=>{}

export default function (fn, prop = DEFAULT, ...defArgs) {
  let cntx = (fn && prop !== DEFAULT) ? fn : DEFAULT;

  if (cntx === fn && prop in fn) {
    cntx = fn
    fn = cntx[prop]
    prop = DEFAULT
  } else {
    cntx = DEFAULT

    if (prop !== DEFAULT) {
      defArgs = [prop].concat(defArgs || [])
    }
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      var _this = cntx === DEFAULT ? this : cntx;
      fn.call(_this, ...defArgs, ...args, function (err, val) {
        return err ? reject(err) : resolve(val)
      })
    })
  }
}