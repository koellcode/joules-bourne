const {alive} = require('./')

module.exports = (routePrefix, router) => {
  router.get(`${routePrefix}/alive`, alive)
}
