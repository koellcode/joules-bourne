const {allowedSportTypes} = require('./constants')

class ValidationError extends Error {}

module.exports = {
  validateSportType: (type) => {
    if (!allowedSportTypes.includes(type)) throw new ValidationError(`supported sport types are: ${allowedSportTypes.join(',')}`)
  },
  ValidationError: ValidationError
}
