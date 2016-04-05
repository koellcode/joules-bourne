function *postActivityHandler (next) {
  console.log('posted')
  this.status = 200
  yield next;
}

module.exports = function (router) {
  router.post('/activity', postActivityHandler)
}
