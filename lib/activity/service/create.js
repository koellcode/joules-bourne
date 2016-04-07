module.exports = function *(db, model) {
  return {
    type: 'running',
    source: 'endomondo'
  }
}