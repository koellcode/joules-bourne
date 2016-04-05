function *aliveHandler (next) {
  console.log(yield this.couchbase.getAsync('00305e72-9d25-40eb-b9d8-7650d8ee7e17', {}))
  this.body = {
    alive: true
  }
  yield next
}


module.exports = function (router) {
  router.get('/alive', aliveHandler)
}
