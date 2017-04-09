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

  app.post(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.stub && req.user) {
      if(!req.body.stub.name) {
        res.status(400).json({error: 'Stub name required'})
      }
      if(!req.body.stub.amount_type) {
        res.status(400).json({error: 'Stub amount type required'})
      }
      if(!req.user.id) {
        res.status(400).json({error: 'Invalid user'})
      }
      models.Stub.create({name: req.body.stub.name, description: req.body.stub.description || '', amount_type: req.body.stub.amount_type, userId: req.user.id})
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

  app.put(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.stub && req.body.stub.id) {
      models.Stub.update(req.body.stub, { where: { id: req.body.stub.id } })
        .then(function(stub) {
          res.status(200).json({stub})
        })
        .catch(function(err) {
          res.status(400).json({error: 'Bad request'})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
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
