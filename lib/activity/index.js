function *postActivityHandler (next) {
  this.status = 200
  yield next;
}

module.exports = function (router) {
  router.post('/activity', postActivityHandler)
}
