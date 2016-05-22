const koaBody = require('koa-body')()
const {postActivity, getActivity, getMapForActivity, getActivityList} = require('./')

const registerJsonRoutes = (routePrefix, router) => {
  router.post(`${routePrefix}/activity`, koaBody, postActivity)
  router.get(`${routePrefix}/activity`, getActivityList)
  router.get(`${routePrefix}/activity/:id`, getActivity)
  router.get(`${routePrefix}/activity/:id/map`, getMapForActivity)
}

module.exports = (routePrefix, router) => {
  registerJsonRoutes(routePrefix, router)
}
