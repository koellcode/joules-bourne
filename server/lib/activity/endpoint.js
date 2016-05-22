const {postActivity, getActivity, getMapForActivity, getActivityList} = require('./')
const {postActivityTCX} = require('./')

const registerJsonRoutes = (routePrefix, router) => {
  router.post(`${routePrefix}/activity`, postActivity)
  router.get(`${routePrefix}/activity`, getActivityList)
  router.get(`${routePrefix}/activity/:id`, getActivity)
  router.get(`${routePrefix}/activity/:id/map`, getMapForActivity)
}

const registerTcxRoutes = (routePrefix, router) => {
  router.post(`${routePrefix}/activity`, postActivityTCX)
}

module.exports = (routePrefix, router) => {
  registerTcxRoutes(routePrefix, router)
  registerJsonRoutes(routePrefix, router)
}
