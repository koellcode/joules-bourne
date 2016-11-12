'use strict'

require('mocha-generators').install()
const {expect} = require('chai')

describe('activity endpoint', () => {
  let endpoint = null
  let request = null
  let koaTest = null
  let superagent = null
  let dbStub = null

  before('require', () => {
    endpoint = require('../endpoint')
    koaTest = require('./koa-test')()
    superagent = require('supertest')
  })

  before(() => {
    const app = koaTest.createKoaApp(endpoint)
    dbStub = koaTest.dbStub()
    request = superagent(app.listen())
  })

  beforeEach(() => {
    koaTest.reset()
  })

  describe('post json', () => {
    it('should answer with status 422 when given sport type is wrong', function (done) {
      request.post('/activity').send({sport: 'none', Id: 'id'}).expect(422, () => {
        expect(dbStub.put.calledOnce).to.be.false
        done()
      })
    })
    it('should answer with status 200 when validation of given model succeeds', function (done) {
      request.post('/activity').send({sport: 'Biking', Id: 'id'}).expect(200, () => {
        expect(dbStub.put.calledOnce).to.be.true
        done()
      })
    })
    it('should answer with status 200 when validation of multiple given models succeeds', function (done) {
      request.post('/activity').send([{sport: 'Biking', Id: 'id'}, {sport: 'Running', Id: 'id'}]).expect(200, () => {
        expect(dbStub.put.calledTwice).to.be.true
        done()
      })
    })
  })

  describe('post tcx', () => {
    it('should answer with status 422 when given sport type is wrong', function (done) {
      const tcx = `
      <TrainingCenterDatabase>
        <Activities>
          <Activity Sport="None">
            <Id>2015-01-22T19:57:04.000Z</Id>
          </Activity>
        </Activities>
      </TrainingCenterDatabase>
      `
      request
        .post('/activity')
        .set('Content-Type', 'application/vnd.garmin.tcx+xml')
        .send(tcx)
        .expect(422, () => {
          expect(dbStub.put.calledOnce).to.be.false
          done()
        })
    })
    it('should answer with status 200 when validation of given model succeeds', function (done) {
      const tcx = `
      <TrainingCenterDatabase>
        <Activities>
          <Activity Sport="Biking">
            <Id>2015-01-22T19:57:04.000Z</Id>
          </Activity>
        </Activities>
      </TrainingCenterDatabase>
      `
      request
        .post('/activity')
        .set('Content-Type', 'application/vnd.garmin.tcx+xml')
        .send(tcx)
        .expect(200, () => {
          expect(dbStub.put.calledOnce).to.be.true
          done()
        })
    })
    it('should answer with status 200 when validation of multiple given models succeeds', function (done) {
      const tcx = `
      <TrainingCenterDatabase>
        <Activities>
          <Activity Sport="Biking"><Id>2015-01-22T19:57:04.000Z</Id></Activity>
          <Activity Sport="Running"><Id>2015-01-22T19:57:04.000Z</Id></Activity>
        </Activities>
      </TrainingCenterDatabase>
      `
      request
        .post('/activity')
        .set('Content-Type', 'application/vnd.garmin.tcx+xml')
        .send(tcx)
        .expect(200, () => {
          expect(dbStub.put.calledTwice).to.be.true
          done()
        })
    })
  })
})
