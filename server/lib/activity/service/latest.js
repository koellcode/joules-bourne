'use strict'
const {serialize} = require('../model')

module.exports = (db) => {
  return function * (limit) {
    const activities = yield db.query('activity/amount', {
      reduce: false,
      limit: limit,
      descending: true
    })

    const activityDTOs = yield activities.rows
      .map((row) => db.get(row.id))

    return activityDTOs.map(serialize)
  }
}
