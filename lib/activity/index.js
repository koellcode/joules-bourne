"use strict"

function *postActivityHandler (next) {

  //validate request here
  //
  let create = require('./service/create')(this.db)
  let model = require('./model').newInstance(this.request.body)
 //error handling here
  let createdModel = yield create(model)

  //dto serializer here
  this.response.body = {
    type: createdModel.type,
    source: createdModel.source
  }

  this.status = 200
  yield next;
}

module.exports = function (router) {
  router.post('/activity', postActivityHandler)
}
