const crypto = require('crypto')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt, sendEmail } = options
  return app.post(`${API_HOST}/signup`, function(req, res) {
    if(req.body.email && req.body.password && req.body.first_name && req.body.last_name && req.body.country) {
      //TODO: Check if req.body.country is valid
      const salt = (Math.floor(Math.random() * 1000000000)).toString(36)
      const hash = crypto.createHash('md5').update(req.body.password + salt).digest("hex")
      const ip =
        req.ip
          || req.headers['x-forwarded-for']
          || req.connection.remoteAddress
          || req.socket.remoteAddress
          || req.connection.socket.remoteAddress
          || ''

      const user = {
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
        salt,
        ip_address: ip
      }

      models.User
        .create(user)
        .then(function(user) {
          const payload = { id: user.id }
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          // const emailData = {
          //   from: 'luvpay.io <support@mg.luvpay.io>',
          //   to: user.email,
          //   subject: 'Verify your email address to use luvpay.io',
          //   text: 'Hi!please follow this link to verify your email address.',
          //   html: `<a href=${}>Verify Email</a>`
          // }
          res.status(200).json({user, token})
        })
        .catch(function(error) {
          let returnError = 'Invalid user'
          if(error.errors && Array.isArray(error.errors) && error.errors[0].error) {
            returnError = error.errors[0].error
          }
          res.status(400).json({error: returnError})
        })
    } else {
      res.status(400).json({error: 'missing fields'})
    }
  })
}
