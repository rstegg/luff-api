const passportJWT = require("passport-jwt")
const passportLocal = require("passport-local")

module.exports = function(options) {

  const {
    passport,
    jwt,
    models
  } = options

  const { User } = models

  const { ExtractJwt, Strategy: JwtStrategy } = passportJWT
  const { Strategy: LocalStrategy } = passportLocal

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
  jwtOptions.secretOrKey = process.env.JWT_SECRET

  const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function(email, password, done) {
      User.findOne({ where: { email: email } })
        .then(function (user) {
          if (!user) {
            return done(null, false, { message: 'Incorrect email' })
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password' })
          }
          return done(null, user)
        })
        .catch(function(err) {
          return done(err)
        })
    }
  )

  const jwtStrategy = new JwtStrategy(jwtOptions,
    function(jwt_payload, done) {
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(function(user) {
          if(!user) {
            return done(null, false, { message: 'Invalid token' })
          }
          return done(null, user)
        })
        .catch(function(err) {
          return done(err)
        })
    }
  )

  passport.use(jwtStrategy)
  passport.use(localStrategy)
}
