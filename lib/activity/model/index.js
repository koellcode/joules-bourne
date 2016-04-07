"use strict"

const Immutable = require('immutable')

const deserialize = function (immutableModel) {
  return immutableModel.toJS()
}

const serializeLap = function(lapData) {
  return {
    totaltimeseconds: lapData.totaltimeseconds || 'unknown'
  }
}

const serialize = function (modelData) {
  let model = {
    type: 'activity',
    source: modelData.source || 'unknown',
    sport: modelData.sport || 'unknown',
    laps: (modelData.laps || []).map(serializeLap)
  }
  return Immutable.Map(model)
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize
}