'use strict'

const Couch = require('pouchdb')
const basicAuth = require('basic-auth-header')

module.exports = function (config) {
  let authOptions = {}

  if (process.env.USER && process.env.PASSWORD) {
    authOptions = {
      ajax: {
        headers: {
          Authorization: basicAuth(process.env.USER, process.env.PASSWORD)
        }
      }
    }
  }

  const bucket = new Couch(`http://${config.couch}/${config.bucket}`, authOptions)

  return async (ctx, next) => {
    ctx.db = bucket
    await next()
  }
}
