const koa = require('koa')
const couchbaseMiddleware = require('./middleware/koa-couch')
const router = require('koa-router')()
const koaBody = require('koa-body')()
const app = koa();
const config = require('./config.js')

const features = [
  'activity',
  'alive'
]

const apiVersion = 'v1'
const apiPrefix = `/api/${apiVersion}`

const resolveFeatures = (featureName => {
  return require(`./lib/${featureName}`)
})

const routerWrapper = {
  get: (routeName, routeHandler) => router.get(`${apiPrefix}${routeName}`, routeHandler),
  post: (routeName, routeHandler) => router.post(`${apiPrefix}${routeName}`, koaBody, routeHandler)
}

features
  .map(resolveFeatures)
  .forEach(feature => feature(routerWrapper))

app.use(couchbaseMiddleware(config))
app.use(router.routes())
app.listen(process.env.PORT || 3000);
