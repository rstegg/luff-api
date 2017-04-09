module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options
  return app.get(`${API_HOST}/stubs`, passport.authenticate('jwt', { session: false }), function(req, res) {
    models.Stub.findAll({ where: { userId: req.user.id }})
      .then(function(stubs) {
        res.status(200).json({stubs})
        console.log(stubs);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).json({message: 'Bad request'})
      })
  })
}
