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
        get: () => '',
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

    it('should answer with status 422 when given sport type is wrong', function (done) {
      request.post('/').send({sport: 'none'}).expect(422, done)
    })
    it('should answer with status 200 when given validation succeeds', function (done) {
      request.post('/').send({sport: 'Biking'}).expect(200, done)
    })
  })
})
