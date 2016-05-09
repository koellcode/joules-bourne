'use strict'
const {serialize} = require('../model')

module.exports = (db) => {
  return function * (id) {
    const activity = yield db.get(id)
    return serialize(activity)
  }
}
