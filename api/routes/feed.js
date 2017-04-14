const shortId = require('shortId')

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options

  app.get(`${API_HOST}/feed`, function(req, res) {
    models.Stub.findAll({ where: { is_public: true }, limit: 10, order: [['createdAt', 'DESC']] })
      .then(function(feed) {
        res.status(200).json({feed})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  app.get(`${API_HOST}/feed/:id`, function(req, res) {
    models.Stub.findOne({ where: { slug: req.params.id, is_public: true }})
      .then(function(feed) {
        res.status(200).json({feed})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

}
