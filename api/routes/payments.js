module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options
  app.get(`${API_HOST}/payments`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Payment.findAll({ where: { userId: req.user.id }})
      .then(function(payments) {
        res.status(200).json({payments})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/payments`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.payment && req.user) {
      if(!req.body.payment.name) {
        res.status(400).json({error: 'Payment name required'})
      }
      if(!req.body.payment.amount) {
        res.status(400).json({error: 'Payment amount type required'})
      }
      if(!req.user.id) {
        res.status(400).json({error: 'Invalid user'})
      }
      if(!req.stub.id) {
        res.status(400).json({error: 'Invalid stub'})
      }
      models.Payment.create({name: req.body.payment.name, description: req.body.payment.description || '', amount: req.body.payment.amount, stubId: req.stub.id, userId: req.user.id})
        .then(function(payment) {
          res.status(200).json({payment})
        })
        .catch(function(err) {
          res.status(400).json({error: err})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })

  app.put(`${API_HOST}/payments`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.payment && req.body.payment.id) {
      //TODO: Check that payment doesn't switch stub/user
      models.Payment.update(req.body.payment, { where: { id: req.body.payment.id } })
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
