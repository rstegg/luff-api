const api_key = process.env.MAILGUN_SECRET
const domain = 'mg.luvpay.io'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

module.exports = mailgun
