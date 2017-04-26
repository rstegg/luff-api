const shortId = require('shortid')
const mailcomposer = require('mailcomposer')

const createLuvHandler = require('../handlers/createluvs')
const editLuvHandler = require('../handlers/editluvs')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt, mailgun } = options

  app.get(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.findAll({ where: { userId: req.user.id }})
      .then(function(luvs) {
        res.status(200).json({luvs})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.get(`${API_HOST}/luv/:id`, function(req, res) {
    models.Luv.findOne({ where: { slug: req.params.id }})
      .then(function(luv) {
        res.status(200).json({luv})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.post(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), createLuvHandler(options))

  //TODO: Test with multiple users?
  app.put(`${API_HOST}/luv/:id`, passport.authenticate('jwt', { session: false }), editLuvHandler(options))

  app.post(`${API_HOST}/share/luv`, passport.authenticate('jwt', { session: false }), function(req, res) {
    const mail = mailcomposer({
      from: 'luvpay.io <hello@mg.luvpay.io>',
      to: req.body.email,
      subject: `${req.body.name}, your friend is collecting with luvpay.io!`,
      text: `${req.user.name} is collecting with luvpay.io! Go here to contribute: ${req.body.url}`,
      html: `<div> ${req.user.name} is collecting with luvpay! <a href=${req.body.url}>Go here to contribute</a> Note: ${req.body.message} </div>`
    })
    mail.build(function(mailBuildError, message) {
      const shareEmail = {
        to: req.body.email,
        message: message.toString('ascii')
      }
      mailgun.messages().sendMime(shareEmail, function(sendError, body) {
        if(sendError) {
          console.log(sendError);
          return;
        }
      })
    })
    res.status(200).json({sent: true})
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
