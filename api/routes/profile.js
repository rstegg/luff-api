module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options
  //TODO: remove jwt auth
  app.get(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.User.findOne({ where: { id: req.body.profile.id }})
      .then(function(profile) {
        res.status(200).json({profile})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.put(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.profile && req.user) {
      if(req.user.id !== req.body.profile.id) {
        res.status(400).json({error: 'Invalid credentials'})
      }
      if(!req.body.profile.id) {
        res.status(400).json({error: 'Missing parameters'})
      }
      models.User.update(req.body.profile, { where: { id: req.user.id } })
        .then(function(payment) {
          res.status(200).json({payment})
        })
        .catch(function(err) {
          res.status(400).json({error: 'Bad request'})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })
}
