'use strict'
const fetch = require('node-fetch')
const Immutable = require('immutable')
const {setPath} = require('mapbox-static-paths')(process.env.MAPBOX_TOKEN)

module.exports = (db) => {
  return function * (activityModel) {
    const laps = activityModel.getIn(['laps'])
    const trackPoints = laps.map(
      (lap) => lap.getIn(['Track', 'Trackpoint']).map(
        (trackPoint) => trackPoint.getIn(['Position'])
      )
    )

    const flatTrackpoints = trackPoints.reduce((prev, actual) => prev.concat(actual))
    const mapPath = flatTrackpoints.map((trackPoint) => {
      return Immutable.List([trackPoint.getIn(['LatitudeDegrees']), trackPoint.getIn(['LongitudeDegrees'])])
    })
    const url = setPath(mapPath.toJS()).getUrl({center: 'auto', size: '270x130'})
    return yield fetch(url)
  }
}
