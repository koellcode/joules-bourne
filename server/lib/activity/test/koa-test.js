const Koa = require('koa')
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
      const app = new Koa()
      endpoint('', router)

      app.use(async (ctx, next) => {
        ctx.db = _dbStub
        await next()
      })

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
