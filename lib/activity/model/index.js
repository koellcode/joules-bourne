"use strict"

const Immutable = require('immutable')

const deserialize = function (immutableModel) {
  return immutableModel.toJS()
}

const serializeLap = function(lapData) {
  return {
    TotalTimeSeconds: lapData.TotalTimeSeconds,
    StartTime: lapData.StartTime,
    DistanceMeters: lapData.DistanceMeters,
    MaximumSpeed: lapData.MaximumSpeed,
    Calories: lapData.Calories,
    Intensity: lapData.Intensity,
    TriggerMethod: lapData.TriggerMethod,
    Track: lapData.Track
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