const editProfileHandler = require('../handlers/editProfile')
const getProfileHandler = require('../handlers/getProfile')

module.exports = function(app, options) {
  const { API_HOST, passport } = options
  app.get(`${API_HOST}/profile/:id`, getProfileHandler(options))
  app.post(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), editProfileHandler(options))
}
