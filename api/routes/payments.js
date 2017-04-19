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
      if(!req.body.luvId) {
        res.status(400).json({error: 'Luv ID missing'})
      }
      if(!req.body.name) {
        res.status(400).json({error: 'Payment name required'})
      }
      if(!req.body.amount) {
        res.status(400).json({error: 'Payment amount type required'})
      }
      if(!req.user.id) {
        res.status(400).json({error: 'Invalid user'})
      }
      models.Payment.create({name: req.body.name, description: req.body.description || '', amount: req.body.amount, luvId: req.body.luvId, userId: req.user.id})
        .then(function(payment) {
          res.status(200).json({payment})
        })
        .catch(function(err) {
          res.status(400).json({error: err})
        })
  })

  app.put(`${API_HOST}/payments`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.payment && req.body.payment.id) {
      //TODO: Check that payment doesn't switch luv/user
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
