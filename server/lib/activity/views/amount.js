/* global emit */
module.exports = {
  map: function (doc) {
    if (doc.type === 'activity' && typeof doc.laps !== 'undefined' && doc.laps[0].StartTime) {
      emit(doc._id, 1)
    }
  }
}
