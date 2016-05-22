'use strict'

require('mocha-generators').install()

describe('activity endpoint', () => {
  let endpoint = null
  let request = null
  let koaTest = null
  let agent = null

  before('require', () => {
    endpoint = require('../')
    koaTest = require('./koa-test')
    agent = require('supertest').agent
  })

  describe('post json', () => {
    let app = null

    before(() => {
      app = koaTest.createKoaApp()
      request = agent(app.listen())
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
