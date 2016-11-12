module.exports = {
  alive: async (ctx, next) => {
    this.body = {
      alive: true
    }
    await next()
  }
}
