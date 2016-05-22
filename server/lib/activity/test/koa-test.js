const koa = require('koa')

module.exports = {
  createKoaApp: () => {
    const app = koa()

    app.use(function * (next) {
      this.db = {
        put: function * () {
          return
        }
      }
      yield next
    })

    return app
  },
  reset: () => {

  }
}
