'use strict'

const {serialize, deserialize} = require('./model')

function * postActivityHandler (next) {
  // validate request here
  const model = serialize(this.request.body)

  const create = require('./service/create')(this.db)
  // error handling here
  yield create(model)

  // dto serializer here
  this.response.body = deserialize(model)

  this.status = 200
  yield next
}

function * getActivityListHandler (next) {
  const isAmount = Boolean(this.query.amount)
  if (isAmount) {
    const amount = require('./service/amount')(this.db)
    this.response.body = {
      amount: yield amount()
    }
    yield next
  } else {
    const latestActivies = require('./service/latest')(this.db)
    const listOfLatestActivities = yield latestActivies(10)

    this.response.body = listOfLatestActivities.map(deserialize)
  }
}

function * getActivityHandler () {
  this.response.body = 'not implemented yet'
  this.status = 200
}

module.exports = (router) => {
  router.post('/activity', postActivityHandler)
  router.get('/activity', getActivityListHandler)
  router.get('/activity/:id', getActivityHandler)
}
