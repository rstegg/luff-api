const shortId = require('shortId')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options

  app.get(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Stub.findAll({ where: { userId: req.user.id }})
      .then(function(stubs) {
        res.status(200).json({stubs})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.get(`${API_HOST}/stub/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Stub.findOne({ where: { slug: req.params.id }})
      .then(function(stub) {
        res.status(200).json({stub})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.name && req.body.amount_type && req.user) {
      if(!req.body.name) {
        res.status(400).json({error: 'Stub name required'})
      }
      if(!req.body.amount_type) {
        res.status(400).json({error: 'Stub amount type required'})
      }
      if(!req.user.id) {
        res.status(400).json({error: 'Invalid user'})
      }
      models.Stub.create({
        name: req.body.name,
        description: req.body.description || '',
        amount_type: req.body.amount_type,
        is_public: req.body.is_public || false,
        userId: req.user.id,
        slug: shortId.generate()
      })
        .then(function(stub) {
          res.status(200).json({stub})
        })
        .catch(function(err) {
          res.status(400).json({error: err})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })

  //TODO: Test with multiple users?
  app.put(`${API_HOST}/stub/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Stub.update(req.body.stub, { where: { id: req.body.stub.id, userId: req.user.id } })
      .then(function(stub) {
        res.status(200).json({stub})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.delete(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.stub && req.body.stub.id) {
      models.Stub.destroy({ where: { id: req.body.stub.id } })
        .then(function(stub) {
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
