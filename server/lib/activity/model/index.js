'use strict'

const Immutable = require('immutable')
const pickBy = require('lodash/pickBy')

class ActivityModel {
  constructor (defaults) {
    this.data = Immutable.fromJS(defaults)
  }
  toJS () {
    return this.data.toJS()
  }
  setCreatedDate (date) {
    return this.data.set('createdDate', `${date}`)
  }

  getFlatTrackPoints () {
    const trackPoints = this.getLaps().map(
      (lap) => lap.getIn(['Track', 'Trackpoint'])
        .map((trackPoint) => trackPoint.getIn(['Position']))
    )
    return trackPoints.reduce((prev, actual) => prev.concat(actual))
  }
  getType () {
    return this.data.get('type')
  }
  getSource () {
    return this.data.get('source')
  }
  getSport () {
    return this.data.get('sport')
  }
  getLaps () {
    return this.data.get('laps')
  }
  getStartTime () {
    return this.getLaps().get(0).get('StartTime')
  }
  getMapUrl () {
    return this.data.get('mapUrl')
  }
  getCalories () {
    return this.getLaps()
      .map((lap) => lap.get('Calories'))
      .reduce((allCalories, actual) => allCalories + actual)
  }
}

const deserializeMin = (activityModel) => {
  return {
    sport: activityModel.getSport(),
    start: activityModel.getStartTime(),
    map: activityModel.getMapUrl(),
    calories: activityModel.getCalories()
  }
}
const deserialize = (activityModel) => {
  return activityModel.toJS()
}

const serializeTrackPoints = (track) => {
  if (typeof track === 'undefined') return undefined
  if (typeof track.Trackpoint === 'undefined') return undefined
  return {
    Trackpoint: track.Trackpoint.filter((trackPoint) => trackPoint.Position)
  }
}

const serializeLap = (lapData) => {
  return pickBy({
    TotalTimeSeconds: lapData.TotalTimeSeconds,
    StartTime: lapData.StartTime,
    DistanceMeters: lapData.DistanceMeters,
    MaximumSpeed: lapData.MaximumSpeed,
    Calories: lapData.Calories,
    Intensity: lapData.Intensity,
    TriggerMethod: lapData.TriggerMethod,
    Track: serializeTrackPoints(lapData.Track)
  })
}

const serialize = (modelData) => {
  return new ActivityModel({
    type: 'activity',
    mapUrl: `/api/v1/activity/${modelData._id}/map`,
    source: modelData.source || 'unknown',
    sport: modelData.sport || 'unknown',
    laps: (modelData.laps || []).map(serializeLap)
  })
}

const validate = (modelData) => {
  const {validateSportType} = require('./validator')
  validateSportType(modelData.sport)
  return modelData
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize,
  deserializeMin: deserializeMin,
  validate: validate
}
