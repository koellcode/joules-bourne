'use strict'

const {deserialize} = require('../model')

const appendCreateDate = (model) => {
  return model.setCreatedDate(new Date().toISOString())
}

module.exports = (db) => {
  return function * (model) {
    const id = `${model.getId()}`
    return yield db.put(deserialize(appendCreateDate(model)), id)
  }
}
