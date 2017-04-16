var api_key = process.env.MAILGUN_SECRET
var domain = 'mg.luvpay.io'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

// var data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'serobnic@mail.ru',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!'
// }

module.exports = mailgun
