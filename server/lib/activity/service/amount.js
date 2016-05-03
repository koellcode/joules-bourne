'use strict'

module.exports = (db) => {
  return function * () {
    const result = yield db.query('activity/amount')
    if (result.rows.length === 0) return 0
    return result.rows[0].value
  }
}
