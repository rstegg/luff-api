const api_key = process.env.MAILGUN_SECRET
const domain = 'mg.luvpay.io'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

// var data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'serobnic@mail.ru',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!'
// }

module.exports = mailgun
