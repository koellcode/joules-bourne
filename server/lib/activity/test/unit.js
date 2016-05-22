'use strict'

require('mocha-generators').install()
const {expect} = require('chai')

describe('activity endpoint', () => {
  let endpoint = null
  let request = null
  let koaTest = null
  let agent = null
  let dbStub = null

  before('require', () => {
    endpoint = require('../endpoint')
    koaTest = require('./koa-test')()
    agent = require('supertest').agent
  })

  before(() => {
    const app = koaTest.createKoaApp(endpoint)
    dbStub = koaTest.dbStub()
    request = agent(app.listen())
  })

  beforeEach(() => {
    koaTest.reset()
  })

  describe('post json', () => {
    it('should answer with status 422 when given sport type is wrong', function (done) {
      request.post('/activity').send({sport: 'none'}).expect(422, () => {
        expect(dbStub.put.calledOnce).to.be.false
        done()
      })
    })
    it('should answer with status 200 when validation of given model succeeds', function (done) {
      request.post('/activity').send({sport: 'Biking'}).expect(200, () => {
        expect(dbStub.put.calledOnce).to.be.true
        done()
      })
    })
    it('should answer with status 200 when validation of multiple given models succeeds', function (done) {
      request.post('/activity').send([{sport: 'Biking'}, {sport: 'Running'}]).expect(200, () => {
        expect(dbStub.put.calledTwice).to.be.true
        done()
      })
    })
  })
})
