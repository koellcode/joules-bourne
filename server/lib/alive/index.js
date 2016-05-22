module.exports = {
  alive: function * (next) {
    this.body = {
      alive: true
    }
    yield next
  }
}
