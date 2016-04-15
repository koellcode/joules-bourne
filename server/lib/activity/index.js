"use strict"

const serialize = require('./model').serialize
const deserialize = require('./model').deserialize

function * postActivityHandler (next) {
  //validate request here
  let model = serialize(this.request.body)

  let create = require('./service/create')(this.db)
 //error handling here
  let createdModel = yield create(model)

  //dto serializer here
  this.response.body = deserialize(model)

  this.status = 200
  yield next;
}

module.exports = (router => {
  router.post('/activity', postActivityHandler)
})
