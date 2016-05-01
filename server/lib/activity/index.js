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

module.exports = (router) => {
  router.post('/activity', postActivityHandler)
}
