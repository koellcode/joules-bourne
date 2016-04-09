"use strict"

const uuid = require('uuid')
const deserialize = require('../model').deserialize

module.exports = function (db) {
  return function *(model) {
    //do things with model
    let id = `activity_${uuid.v4()}`
    return yield db.put(deserialize(model), id)
  }
}