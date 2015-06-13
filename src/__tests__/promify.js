/* jshint mocha: true */

describe('promify helper', function () {
  let promify = require('../promify')
  let {expect} = require('chai')

  it('transforms a callback expecting function into a promise returning one', function () {
    let i = 'NoN'
    let fn = function (cb) {
      i = 'NaN'
      cb()
    }

    return promify(fn)().then(()=> expect(i).to.equal('NaN'))
  })

  describe('context', function () {
    it('makes no assumption', function () {
      let cntx
      let obj = {
        method: promify(function (cb) {
          cntx = this
          cb()
        })
      }

      return obj.method().then(()=> {
        expect(cntx).to.equal(obj)
      })
    })

    it('binds properly', function () {
      let cntx
      let obj = {
        method(cb) {
          cntx = this
          cb()
        }
      }

      return promify(obj.method).bind(obj)().then(()=> {
        expect(cntx).to.equal(obj)
      })
    })
  })

  describe('argument application', function () {

    it('accepts default args', function () {
      return promify((a, b, cb) => {
        expect(a).to.equal(1)
        expect(b).to.equal(2)
        cb()
      }, 1, 2)()
    })

    it('accepts partial args', function () {
      return promify((a, b, cb) => {
        expect(a).to.equal(1)
        expect(b).to.equal(2)
        cb()
      }, 1)(2)
    })

    it('does not get tripped up by null', function () {
      let obj = {
        fn(a, b, c, cb) {
          expect(a).to.equal(null)
          expect(b).to.equal(1)
          expect(c).to.equal(2)
          cb()
        }
      }

      return promify(obj.fn, null, 1)(2)
    })
  })


})