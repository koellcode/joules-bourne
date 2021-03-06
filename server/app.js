'use strict'

const Koa = require('koa')
const couchMiddleware = require('./middleware/koa-couch')
const router = require('koa-router')()
const serve = require('koa-static')
const app = new Koa()
const config = require('./config.js')

const features = [
  'activity',
  'alive'
]

const apiVersion = 'v1'
const apiPrefix = `/api/${apiVersion}`

const resolveEndpoints = (featureName) => {
  return require(`./lib/${featureName}/endpoint`)
}

const registerEndpoints = (endpoint) => {
  const routePrefix = `${apiPrefix}`
  endpoint(routePrefix, router)
}

features
  .map(resolveEndpoints)
  .forEach(registerEndpoints)

app.use(couchMiddleware(config))
app.use(router.routes())
app.use(serve('client'))

if (!process.env.MAPBOX_TOKEN) console.warn('No Mapbox token detected: going on without proper map support. (WIP)')
app.listen(process.env.PORT || 3000)
