'use strict'
const {serialize} = require('../model')

module.exports = (db) => {
  return async function (id) {
    const activity = await db.get(id)
    return serialize(activity)
  }
}
