'use strict'

require('mocha-generators').install()
const koa = require('koa')

describe('activity endpoint', () => {
  describe('post', () => {
    let request = null
    let app = null

    before(() => {
      app = koa()
      request = require('supertest').agent(app.listen())

      require('../')({
        post: (route, handler) => {
          app.use(require('koa-body')())
          app.use(function * (next) {
            this.db = {
              put: function * () {
                return
              }
            }
            yield next
          })
          app.use(handler)
        }
      })
    })

    it('should answer with status 200', function (done) {
      request.post('/').send({}).expect(200, done)
    })
  })
})
