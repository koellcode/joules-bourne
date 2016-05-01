'use strict'

const uuid = require('uuid')
const deserialize = require('../model').deserialize

const appendCreateDate = (model) => {
  return model.set('createdDate', new Date().toISOString())
}

module.exports = (db) => {
  return function * (model) {
    let id = `activity_${uuid.v4()}`
    return yield db.put(deserialize(appendCreateDate(model)), id)
  }
}
