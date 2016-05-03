'use strict'

module.exports = (db) => {
  return function * () {
    const result = yield db.query('activity/amount')
    return result.rows[0].value
  }
}
