'use strict'

const {serialize, deserialize, deserializeMin, validate} = require('./model')
const {ValidationError} = require('./model/validator')

async function getActivity (next) {
  const getActivity = require('./service/get')(this.db)
  this.response.body = deserialize(await getActivity(this.params.id))
  this.status = 200
  await next
}

module.exports = {
  postActivity: function * (next) {
    if (!this.request.body) {
      const getRawBody = require('raw-body')
      const jsonString = yield getRawBody(this.req)
      this.request.body = JSON.parse(jsonString)
    }

    let modelDataList = null

    if (Array.isArray(this.request.body)) {
      modelDataList = this.request.body
    } else {
      modelDataList = [this.request.body]
    }

    try {
      modelDataList.forEach(validate)
    } catch (error) {
      if (error instanceof ValidationError) {
        this.status = 422
        this.response.body = {message: error.message}
        return yield next
      } else {
        this.status = 500
        return yield next
      }
    }

    const create = require('./service/create')(this.db)

    yield modelDataList
      .map(serialize)
      .map(create)

    this.status = 200
    yield next
  },
  getActivityList: function * (next) {
    const isAmount = Boolean(this.query.amount)
    if (isAmount) {
      const amount = require('./service/amount')(this.db)
      this.response.body = {
        amount: yield amount()
      }
      yield next
    } else {
      const latestActivies = require('./service/latest')(this.db)
      const listOfLatestActivities = yield latestActivies(10)
      this.response.body = listOfLatestActivities.map(deserializeMin)
      yield next
    }
  },
  getActivity: getActivity,
  getMapForActivity: function * (next) {
    const getActivity = require('./service/get')(this.db)
    const activity = yield getActivity(this.params.id)
    const getMap = require('./service/static-map')(this.db)
    const staticMap = yield getMap(activity)

    this.body = staticMap.body
    this.type = 'image/png'
    this.status = 200
    yield next
  },
  postActivityTCX: function * (next) {
    if (!this.request.is('application/vnd.garmin.tcx+xml')) {
      return yield next
    }

    const getRawBody = require('raw-body')
    const xml = yield getRawBody(this.req)

    try {
      const activityDtos = require('../../../importer/tcx/tcx-to-dto')(xml)
      this.request.body = activityDtos
      yield next
    } catch (error) {
      this.throw(error.message, 500)
    }
  }
}
