module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options
  //TODO: remove jwt auth
  app.get(`${API_HOST}/profile/:id`, function(req, res) {
    models.User.findOne({ where: { username: req.params.id }})
      .then(function(user) {
        const profile = {
          id: user.id,
          name: user.name,
          username: user.username,
          image: user.image,
          bio: user.bio
        }
        res.status(200).json({profile})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.profile.id === req.user.id) {
      const {
        name,
        email,
        dob,
        bio,
        username
      } = req.body.profile
      const updatedUser = {
        name,
        email,
        dob,
        bio,
        username
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
