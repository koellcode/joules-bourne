'use strict'

const getActivity = require('./get')

module.exports = function (db) {
  return async function (limit) {
    const activities = await db.query('activity/amount', {
      reduce: false,
      limit: limit,
      descending: true
    })

    const get = getActivity(db)

    const resolvedActivities = Promise.all(
      activities.rows
        .map(row => row.id)
        .map(get)
    )
    return resolvedActivities
  }
}
