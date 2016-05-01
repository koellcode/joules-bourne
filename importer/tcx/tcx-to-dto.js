'use strict'

const parser = require('xml2json')

const getListOf = (target) => {
  return Array.isArray(target) ? target : [target]
}

module.exports = (xml) => {
  const options = {
    object: true,
    reversible: false,
    coerce: true,
    sanitize: true,
    trim: true,
    arrayNotation: false
  }

  const json = parser.toJson(xml, options)
  const activities = getListOf(json.TrainingCenterDatabase.Activities.Activity)

  const source = json.TrainingCenterDatabase.Author.Name

  const dto = activities.map((activity) => {
    return {
      source: source,
      sport: activity.Sport,
      laps: getListOf(activity.Lap)
    }
  })

  return dto
}
