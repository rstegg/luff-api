'use strict'
const jwt = require('jsonwebtoken')
const API_HOST = process.env.API_HOST

const login = require('./routes/login')
const signup = require('./routes/signup')
const stubs = require('./routes/stubs')
const payments = require('./routes/payments')
const profile = require('./routes/profile')
const images = require('./routes/images')
const feed = require('./routes/feed')

const configureAuth = require('./service/auth')

module.exports = function(options) {

  const { app, models, passport } = options

  const authOptions = {
    API_HOST,
    models,
    passport,
    jwt
  }

  configureAuth(authOptions)

  login(app, authOptions)
  signup(app, authOptions)
  stubs(app, authOptions)
  payments(app, authOptions)
  profile(app, authOptions)
  images(app, authOptions)
  feed(app, authOptions)
  /**
   * All of your api routes go here.
   * Format them in the following way:
   * app.post(prefix+'endpoint', callback)
   * app.get(prefix+'endpoint', callback)
   */

}
