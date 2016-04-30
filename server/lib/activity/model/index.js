"use strict"

const Immutable = require('immutable')
const pickBy = require('lodash/pickBy')

const deserialize = (immutableModel => {
  return immutableModel.toJS()
})

const serializeLap = (lapData => {
  return pickBy({
    TotalTimeSeconds: lapData.TotalTimeSeconds,
    StartTime: lapData.StartTime,
    DistanceMeters: lapData.DistanceMeters,
    MaximumSpeed: lapData.MaximumSpeed,
    Calories: lapData.Calories,
    Intensity: lapData.Intensity,
    TriggerMethod: lapData.TriggerMethod,
    Track: lapData.Track
  })
})

const serialize = (modelData => {
  const model = {
    type: 'activity',
    source: modelData.source || 'unknown',
    sport: modelData.sport || 'unknown',
    laps: (modelData.laps || []).map(serializeLap)
  }
  return Immutable.Map(model)
})

module.exports = {
  serialize: serialize,
  deserialize: deserialize
}