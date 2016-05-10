'use strict'
const fetch = require('node-fetch')
const Immutable = require('immutable')
const {setPath} = require('mapbox-static-paths')(process.env.MAPBOX_TOKEN)

module.exports = (db) => {
  return function * (activityModel) {
    const flatTrackpoints = activityModel.getFlatTrackPoints()
    const mapPath = flatTrackpoints.map((trackPoint) => {
      return Immutable.List([trackPoint.getIn(['LatitudeDegrees']), trackPoint.getIn(['LongitudeDegrees'])])
    })
    const url = setPath(mapPath.toJS()).getUrl({center: 'auto', size: '270x130'})
    return yield fetch(url)
  }
}
