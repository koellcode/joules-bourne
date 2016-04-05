const koa = require('koa');
const route = require('koa-route');
const app = koa();

const features = [
  'alive'
]

const featureToRest = function (feature) {
  return route.get(`/api/v1/${feature}`, require(`./lib/${feature}`))
}

features
  .map(featureToRest)
  .forEach(route => app.use(route))

app.listen(3000);
