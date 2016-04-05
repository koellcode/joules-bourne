function *aliveHandler () {
  this.body = {
    alive: true
  }
}


module.exports = function (router) {
  router.get('/alive', aliveHandler)
}
