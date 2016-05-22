const koa = require('koa')
const router = require('koa-router')()
require('sinon-as-promised')
const sinon = require('sinon')

const createDbStub = (sandbox) => {
  const dbStub = {
    put: sandbox.stub().resolves()
  }
  return dbStub
}

module.exports = () => {
  const sandbox = sinon.sandbox.create()
  const _dbStub = createDbStub(sandbox)

  return {
    createKoaApp: (endpoint) => {
      const app = koa()

      app.use(function * (next) {
        this.db = _dbStub
        yield next
      })

      endpoint('', router)
      app.use(router.routes())
      return app
    },
    reset: () => {
      sandbox.reset()
    },
    dbStub: () => {
      return _dbStub
    }
  }
}
