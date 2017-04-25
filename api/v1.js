'use strict'
const jwt = require('jsonwebtoken')
const API_HOST = process.env.API_HOST

const login = require('./routes/login')
const signup = require('./routes/signup')
const luvs = require('./routes/luvs')
const payments = require('./routes/payments')
const profile = require('./routes/profile')
const images = require('./routes/images')
const feed = require('./routes/feed')
const account = require('./routes/account')

const configureAuth = require('./service/auth')
const { mailgun } = require('./service/mail')
const stripe = require('./service/stripe')

module.exports = function(options) {

  const { app, models, passport } = options

  const authOptions = {
    API_HOST,
    models,
    passport,
    jwt,
    mailgun,
    stripe
  }

  configureAuth(authOptions)

  login(app, authOptions)
  signup(app, authOptions)
  luvs(app, authOptions)
  payments(app, authOptions)
  profile(app, authOptions)
  images(app, authOptions)
  feed(app, authOptions)
  account(app, authOptions)
  /**
   * All of your api routes go here.
   * Format them in the following way:
   * app.post(prefix+'endpoint', callback)
   * app.get(prefix+'endpoint', callback)
   */

}
