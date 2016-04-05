const koa = require('koa');
const route = require('koa-route');
const app = koa();

alive = route.get('/alive', require('./lib/alive'));

app.use(alive);
app.listen(3000);
