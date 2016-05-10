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
        .filter((trackPoint) => trackPoint.getIn(['Position']))
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
}

const deserialize = (activityModel) => {
  return activityModel.toJS()
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
    Track: lapData.Track
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

module.exports = {
  serialize: serialize,
  deserialize: deserialize
}
