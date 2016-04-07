module.exports = function (db) {
  return function *(model) {
    return {
      type: 'running',
      source: 'endomondo'
    }
  }
}