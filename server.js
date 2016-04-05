const koa = require('koa');
const router = require('koa-router')();
const app = koa();

const features = [
  'activity',
  'alive'
]

const apiVersion = 'v1'
const apiPrefix = `/api/${apiVersion}`

const resolveFeatures = function (featureName) {
  return require(`./lib/${featureName}`)
}

const routerWrapper = {
  get: (routeName, routeHandler) => router.get(`${apiPrefix}${routeName}`, routeHandler),
  post: (routeName, routeHandler) => router.post(`${apiPrefix}${routeName}`, routeHandler)
}

features
  .map(resolveFeatures)
  .forEach(feature => feature(routerWrapper))

app.use(router.routes())
app.listen(process.env.PORT || 3000);
