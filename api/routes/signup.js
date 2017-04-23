const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt, mailgun, stripe } = options
  app.post(`${API_HOST}/signup`, function(req, res) {
    if(req.body.email && req.body.password && req.body.first_name && req.body.last_name && req.body.country) {
      models.User.findOne({where: { email: req.body.email }})
        .then(user => {
          if(!user) {
            let username = req.body.first_name + '.' + req.body.last_name
            models.User.findOne({where: { username }})
              .then(user => {
                if(user) {
                  const randomExt = shortId.generate().slice(0,3)
                  username.conat(`_${randomExt}`)
                }
              })
              .catch(console.error)
          //TODO: Check if req.body.country is valid
          const salt = (Math.floor(Math.random() * 1000000000)).toString(36)
          const hash = crypto.createHash('md5').update(req.body.password + salt).digest('hex')
          const ip =
            req.ip
              || req.headers['x-forwarded-for']
              || req.connection.remoteAddress
              || req.socket.remoteAddress
              || req.connection.socket.remoteAddress
              || ''

          const unsafePermalink =
            req.body.email + crypto.randomBytes(4).toString('hex')
          const permalink =
            unsafePermalink
              .toLowerCase()
              .replace(' ', '')
              .replace(/[^\w\s]/gi, '')
              .trim()

          const verify_token = crypto.randomBytes(20).toString('hex')

          const currency = req.body.country === 'CA' ? 'CAD' : 'USD'

          const user = {
            email: req.body.email,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username,
            country: req.body.country,
            currency,
            salt,
            ip_address: ip,
            verified: false,
            permalink,
            verify_token
          }

          const permalink_url = `https://luvpay.io/signup/email_confirmation/${permalink}/${verify_token}`

          models.User
            .create(user)
            .then(function(user) {
              const payload = { id: user.id }
              const token = jwt.sign(payload, process.env.JWT_SECRET)
              const mail = mailcomposer({
                from: 'luvpay.io <hello@mg.luvpay.io>',
                to: user.email,
                subject: 'Verify your email address to use luvpay.io',
                text: 'Hi! Please follow this link to verify your email address: ' + permalink_url,
                html: `<div>
                        <h1>Hi!</h1>
                        <br />
                        <p>Please click the link below to verify your email address.</p>
                        <p><a href=${permalink_url}>Click Here</a></p>
                      </div>`
              })
              mail.build(function(mailBuildError, message) {
                const verifyEmail = {
                  to: user.email,
                  message: message.toString('ascii')
                }
                mailgun.messages().sendMime(verifyEmail, function(sendError, body) {
                  if(sendError) {
                    console.log(sendError);
                    return;
                  }
                })
              })
              res.status(200).json({registered: true}) //TODO: Redirect to 'check your email' page
            })
            .catch(function(error) {
              let returnError = 'Invalid user'
              if(error.errors && Array.isArray(error.errors) && error.errors[0].error) {
                returnError = error.errors[0].error
              }
              res.status(400).json({error: returnError})
            })
        } else {
          res.status(400).json({error: 'email registered'})
        }
      })
      .catch(console.error)
    } else {
      res.status(400).json({error: 'missing fields'})
    }
  })

  app.post(`${API_HOST}/signup/check_email`, function(req, res) {
    if(req.body.email) {
      models.User
        .findOne({ where: { email: req.body.email } })
        .then(function(user) {
          if(user) {
            res.status(200).json({emailTaken: true})
          } else {
            res.status(200).json({emailTaken: false})
          }
        })
        .catch(function(error) {
          res.status(200).json({emailTaken: false})
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
                  name: user.first_name + ' ' + user.last_name,
                  address: user.email,
                  vars: { country: user.country }
                }
                mailgun.lists('news@mg.luvpay.io').members().create(verified, function(err, data) {
                  if(err) {
                    console.log(err);
                  }
                  res.redirect('/login')
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
