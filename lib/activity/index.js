function *postActivityHandler (next) {
  //validate request here
  //
  create = require('./service/create');
  //have a model here
  const model = {
    type: this.request.body.type,
    source: this.request.body.source
  }

 //error handling here
  const createdModel = yield create(model)

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
