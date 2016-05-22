'use strict'

require('mocha-generators').install()
const koa = require('koa')

describe('activity endpoint', () => {
  describe('post json', () => {
    let request = null
    let app = null
    let endpoint = null

    before('require', () => {
      endpoint = require('../')
    })

    before(() => {
      app = koa()
      request = require('supertest').agent(app.listen())
      app.use(function * (next) {
        this.db = {
          put: function * () {
            return
          }
        }
        yield next
      })
      app.use(require('koa-body')())
      app.use(endpoint.postActivity)
    })

    it('should answer with status 422 when given sport type is wrong', function (done) {
      request.post('/').send({sport: 'none'}).expect(422, done)
    })
    it('should answer with status 200 when validation of given model succeeds', function (done) {
      request.post('/').send({sport: 'Biking'}).expect(200, done)
    })
    it('should answer with status 200 when validation of multiple given models succeeds', function (done) {
      request.post('/').send([{sport: 'Biking'}, {sport: 'Running'}]).expect(200, done)
    })
  })
})
