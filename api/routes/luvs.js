const shortId = require('shortid')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options

  app.get(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.findAll({ where: { userId: req.user.id }})
      .then(function(luvs) {
        res.status(200).json({luvs})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.get(`${API_HOST}/luv/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.findOne({ where: { slug: req.params.id }})
      .then(function(luv) {
        res.status(200).json({luv})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.name && req.body.amount_type && req.user) {
      if(!req.body.name) {
        res.status(400).json({error: 'Luv name required'})
      }
      if(!req.body.amount_type) {
        res.status(400).json({error: 'Luv amount type required'})
      }
      if(!req.user.id) {
        res.status(400).json({error: 'Invalid user'})
      }
      models.Luv.create({
        name: req.body.name,
        description: req.body.description || '',
        amount_type: req.body.amount_type,
        is_public: req.body.is_public || false,
        userId: req.user.id,
        slug: shortId.generate()
      })
        .then(function(luv) {
          res.status(200).json({luv})
        })
        .catch(function(err) {
          res.status(400).json({error: err})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })

  //TODO: Test with multiple users?
  app.put(`${API_HOST}/luv/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.update(req.body.luv, { where: { id: req.body.luv.id, userId: req.user.id } })
      .then(function(luv) {
        res.status(200).json({luv})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.delete(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.luv && req.body.luv.id) {
      models.Luv.destroy({ where: { id: req.body.luv.id } })
        .then(function(luv) {
          res.status(200)
        })
        .catch(function(err) {
          res.status(400).json({error: 'Bad request'})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })
}
