const koa = require('koa')
const router = require('koa-router')()
require('sinon-as-promised')
const sinon = require('sinon')

const createDbStub = () => {
  const sandbox = sinon.sandbox.create()
  const dbStub = {
    put: sandbox.stub().resolves()
  }
  return dbStub
}

module.exports = {
  createKoaApp: (endpoint, _dbStub = createDbStub()) => {
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

  }
}
