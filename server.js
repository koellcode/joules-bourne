const koa = require('koa');
const route = require('koa-route');
const app = koa();

const features = [
  'alive'
]

const apiVersion = 'v1'
const apiPrefix = `/api/${apiVersion}`

const resolveFeatures = function (featureName) {
  return require(`./lib/${featureName}`)
}

const router = {
  get: (routeName, routeHandler) => app.use(route.get(`${apiPrefix}${routeName}`, routeHandler))
}

features
  .map(resolveFeatures)
  .forEach(feature => feature(router))

app.listen(process.env.PORT || 3000);
