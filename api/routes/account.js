const crypto = require('crypto')
const mailcomposer = require('mailcomposer')

module.exports = function(app, options) {
  const { models, API_HOST, passport } = options
  app.post(`${API_HOST}/card`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.User
      .findOne({ where: { id: req.user.id } })
      .then(function(user) {
        if(user) {
          const updated_card_accounts = user.card_accounts.concat(req.body.card)
          models.User
            .update({ card_accounts: updated_card_accounts }, { where: { id: req.user.id } })
              .then(function(updatedUser) {
                res.status(200).json({user: updatedUser})
              })
              .catch(function(err) {
                console.log(err);
              })
        } else {
          res.status(400).json({error: 'No user'})
        }
      })
      .catch(function(error) {
        console.log(error)
        res.status(200).json({error: 'Invalid request'})
      })
  })

  app.post(`${API_HOST}/bank`, passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(req.body);
    models.User
      .findOne({ where: { id: req.user.id } })
      .then(function(user) {
        if(user) {
          const updated_bank_accounts = user.bank_accounts.concat(req.body.bank)
          models.User
            .update({ bank_accounts: updated_bank_accounts }, { where: { id: req.user.id } })
              .then(function(updatedUser) {
                res.status(200).json({user: updatedUser})
              })
              .catch(function(err) {
                console.log(err);
              })
        } else {
          res.status(400).json({error: 'No user'})
        }
      })
      .catch(function(error) {
        console.log(error)
        res.status(200).json({error: 'Invalid request'})
      })
  })
}
