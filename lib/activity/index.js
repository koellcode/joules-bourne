"use strict";

function *postActivityHandler (next) {

  //validate request here
  //
  let create = require('./service/create')(this.db);
  //have a model here
  let model = {
    type: this.request.body.type,
    source: this.request.body.source
  }

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
