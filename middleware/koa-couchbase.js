const couchbase = require('couchbase-promises')

module.exports = function (config) {
  const cluster = new couchbase.Cluster(`couchbase://${config.couch}`)
  const bucket = cluster.openBucket(config.bucket)
  return function *(next) {
    this.couchbase = bucket
    yield next
  }
}