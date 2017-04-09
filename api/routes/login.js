module.exports = function(app, options) {
  const { API_HOST, passport, jwt } = options
  return app.post(`${API_HOST}/login`, passport.authenticate('local', { session: false }), function(req, res) {
    const payload = { id: req.user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ user: req.user, token: token })
  })
}
