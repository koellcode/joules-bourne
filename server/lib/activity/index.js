'use strict'

const {serialize, deserialize, deserializeMin, validate} = require('./model')
const {ValidationError} = require('./model/validator')

async function getActivity (ctx, next) {
  const getActivity = require('./service/get')(ctx.db)
  ctx.response.body = deserialize(await getActivity(ctx.params.id))
  ctx.status = 200
  await next()
}

async function getActivityList (ctx, next) {
  const isAmount = Boolean(ctx.query.amount)
  if (isAmount) {
    const amount = require('./service/amount')(ctx.db)
    ctx.response.body = {
      amount: await amount()
    }
    await next()
  } else {
    const latestActivies = require('./service/latest')(ctx.db)
    const listOfLatestActivities = await latestActivies(10)
    ctx.response.body = listOfLatestActivities.map(deserializeMin)
    await next()
  }
}

module.exports = {
  postActivity: async (ctx, next) => {
    if (!ctx.request.body) {
      const getRawBody = require('raw-body')
      const jsonString = await getRawBody(ctx.req)
      ctx.request.body = JSON.parse(jsonString)
    }

    let modelDataList = null

    if (Array.isArray(ctx.request.body)) {
      modelDataList = ctx.request.body
    } else {
      modelDataList = [ctx.request.body]
    }

    try {
      modelDataList.forEach(validate)
    } catch (error) {
      if (error instanceof ValidationError) {
        ctx.status = 422
        ctx.response.body = {message: error.message}
        return await next()
      } else {
        ctx.status = 500
        return await next()
      }
    }

    const create = require('./service/create')(ctx.db)

    modelDataList
      .map(serialize)
      .map(create)

    ctx.status = 200
    await next()
  },
  getActivityList: getActivityList,
  getActivity: getActivity,
  getMapForActivity: async (ctx, next) => {
    const getActivity = require('./service/get')(ctx.db)
    const activity = await getActivity(ctx.params.id)
    const getMap = require('./service/static-map')(ctx.db)
    const staticMap = await getMap(activity)

    ctx.body = staticMap.body
    ctx.type = 'image/png'
    ctx.status = 200
    await next()
  },
  postActivityTCX: async (ctx, next) => {
    if (!ctx.request.is('application/vnd.garmin.tcx+xml')) {
      return await next()
    }

    const getRawBody = require('raw-body')
    const xml = await getRawBody(ctx.req)

    try {
      const activityDtos = require('../../../importer/tcx/tcx-to-dto')(xml)
      ctx.request.body = activityDtos
      await next()
    } catch (error) {
      ctx.throw(error.message, 500)
    }
  }
}
