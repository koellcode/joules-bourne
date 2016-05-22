'use strict'

const {serialize, deserialize, deserializeMin, validate} = require('./model')
const {ValidationError} = require('./model/validator')

module.exports = {
  postActivity: function * (next) {
    const modelData = this.request.body

    try {
      validate(modelData)
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
    const model = serialize(modelData)
    const create = require('./service/create')(this.db)
    // error handling here
    yield create(model)
    // dto serializer here
    this.response.body = deserialize(model)
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
  getActivity: function * (next) {
    const getActivity = require('./service/get')(this.db)
    this.response.body = deserialize(yield getActivity(this.params.id))
    this.status = 200
    yield next
  },
  getMapForActivity: function * (next) {
    const getActivity = require('./service/get')(this.db)
    const activity = yield getActivity(this.params.id)
    const getMap = require('./service/static-map')(this.db)
    const staticMap = yield getMap(activity)

    this.body = staticMap.body
    this.type = 'image/png'
    this.status = 200
    yield next
  }
}
