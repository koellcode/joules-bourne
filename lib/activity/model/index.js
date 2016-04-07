"use strict"

class ActivityModel {
  constructor(data) {
    this.setType(data.type)
  }

  setType (type) {
    this.type = type
  }

  getType () {
    return type
  }
}

deserialize = function (model) {
  dto = {}
  dto.type = model.getType()
}

serialize = function (modelData) {
  return new ActivityModel(modelData)
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize
}