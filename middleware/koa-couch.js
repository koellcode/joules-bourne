const Couch = require('pouchdb')

module.exports = function (config) {
  const bucket = new Couch(`http://${config.couch}/${config.bucket}`)

  return function *(next) {
    this.db = bucket
    yield next
  }
}