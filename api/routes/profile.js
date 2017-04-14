module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options
  //TODO: remove jwt auth
  app.get(`${API_HOST}/profile/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.User.findOne({ where: { id: req.params.id }})
      .then(function(profile) {
        res.status(200).json({profile})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.profile.id === req.user.id) {
      const {
        first_name,
        last_name,
        email,
        country,
        dob,
        bio
      } = req.body.profile
      const updatedUser = {
        first_name,
        last_name,
        email,
        country,
        dob,
        bio
      }
      models.User.update(updatedUser, { where: { id: req.user.id } })
        .then(function(profile) {
          res.status(200).json({profile})
        })
        .catch(function(err) {
          res.status(400).json({error: 'Bad request'})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })
}
