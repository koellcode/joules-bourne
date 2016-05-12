'use strict'

const uuid = require('uuid')
const {deserialize} = require('../model')

const appendCreateDate = (model) => {
  return model.setCreatedDate(new Date().toISOString())
}

module.exports = (db) => {
  return function * (model) {
    const id = `activity_${uuid.v4()}`
    return yield db.put(deserialize(appendCreateDate(model)), id)
  }
}
