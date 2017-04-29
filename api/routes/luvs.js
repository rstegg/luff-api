const shortId = require('shortid')

const createLuvHandler = require('../handlers/createluvs')
const editLuvHandler = require('../handlers/editluvs')
const shareLuvHandler = require('../handlers/shareluvs')

module.exports = function(app, options) {
  const { models, API_HOST, passport } = options

  app.get(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.findAll({ where: { userId: req.user.id }})
      .then(luvs => {
        res.status(200).json({luvs})
      })
      .catch(err => {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.get(`${API_HOST}/luv/:id`, function(req, res) {
    models.Luv.findOne({
      include: [{
        model: models.User,
        attributes: ['image', 'username']
      }],
      where: { slug: req.params.id }
    })
    .then(luv => {
      res.status(200).json({luv})
    })
    .catch(err => {
      res.status(400).json({error: 'Bad request'})
    })
  })

  app.post(`${API_HOST}/luvs`, passport.authenticate('jwt', { session: false }), createLuvHandler(options))

  //TODO: Test with multiple users?
  app.put(`${API_HOST}/luv/:id`, passport.authenticate('jwt', { session: false }), editLuvHandler(options))

  app.post(`${API_HOST}/share/luv`, passport.authenticate('jwt', { session: false }), shareLuvHandler(options))

  app.delete(`${API_HOST}/luv/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Luv.destroy({ where: { id: req.params.id, userId: req.user.id } })
      .then(function(luv) {
        res.status(200).json({luv})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })
}
