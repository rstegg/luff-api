const signupHandler = require('../handlers/signup')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt, mailgun, stripe } = options
  app.post(`${API_HOST}/signup`, signupHandler(options))

  app.post(`${API_HOST}/signup/validate_email`, function(req, res) {
    if(req.body.email) {
      models.User
        .findOne({ where: { email: req.body.email } })
        .then(user => {
          if(user) {
            res.status(200).json({emailTaken: true})
          } else {
            res.status(200).json({emailTaken: false})
          }
        })
    } else {
      res.status(400).json({error: 'missing email'})
    }
  })

  app.post(`${API_HOST}/signup/validate_username`, function(req, res) {
    if(req.body.username) {
      models.User
        .findOne({ where: { username: req.body.username } })
        .then(user => {
          if(user) {
            res.status(200).json({usernameTaken: true})
          } else {
            res.status(200).json({usernameTaken: false})
          }
        })
    } else {
      res.status(400).json({error: 'missing email'})
    }
  })

  app.get(`/signup/email_confirmation/:permalink/:verify_token`, function(req, res) {
    const permalink = req.params.permalink
    const verify_token = req.params.verify_token
      models.User.findOne({ where: { permalink: permalink }})
        .then(function(user) {
          if(user.verify_token === verify_token) {
            models.User.update({ verified: true }, { where: { permalink: permalink } })
              .then(function(updatedUser) {
                const verified = {
                  subscribed: true,
                  name: user.name,
                  address: user.email
                }
                mailgun.lists('news@mg.luvpay.io').members().create(verified, function(err, data) {
                  if(err) {
                    console.log(err);
                  }
                  res.redirect('/')
                })
              })
        } else {
          res.status(200).send('Invalid verification token. Please try again or contact support.')
        }
      })
      .catch(function(err) {
        res.redirect('/')
      })
  })
}
