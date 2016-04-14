function *aliveHandler (next) {
  this.body = {
    alive: true
  }
  yield next
}


module.exports = function (router) {
  router.get('/alive', aliveHandler)
}
