'use strict'

const parser = require('pixl-xml')

const getListOf = (target) => {
  if (!target) return []
  return Array.isArray(target) ? target : [target]
}

module.exports = (xml) => {
  const json = parser.parse(xml)
  const activities = getListOf(json.Activities.Activity)
  let source = null

  if (json.Author) {
    source = json.Author.Name
  }

  const dto = activities.map((activity) => {
    return {
      source: source,
      sport: activity.Sport,
      laps: getListOf(activity.Lap)
    }
  })

  return dto
}
