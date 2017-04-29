const shortId = require('shortid')
const mailcomposer = require('mailcomposer')
const shareEmailTemplate = require('../emails/share')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = (p) => (obj) => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('email'),
        validField('name'),
        validField('url'),
        validField('luvId')
    ]))

const validate = (Luv, req) => {
  if (!validBody(req)) return Promise.reject('missing fields')

  return Luv.findOne({
      where: { id: req.body.luvId }
  })
  .then(luv =>
      !luv ?
          Promise.reject('invalid luv') :
          luv
  )
}

module.exports = ({models, mailgun}) => (req, res) => {
  validate(models.Luv, req)
    .then(luv => {
        const mail = mailcomposer({
          from: 'luvpay.io <hello@mg.luvpay.io>',
          to: req.body.email,
          subject: `${req.body.name}, your friend is collecting with luvpay.io!`,
          text: `${req.user.name} is collecting with luvpay.io! Go here to contribute: ${req.body.url}`,
          html: shareEmailTemplate(req.body.name, req.user.name, req.body.url, req.body.message)
        })
        mail.build((mailBuildError, message) => {
          const shareEmail = {
            to: req.body.email,
            message: message.toString('ascii')
          }
          mailgun.messages().sendMime(shareEmail, (sendError, body) => {
            if(sendError) {
              console.log(sendError);
              return;
            }
          })
        })
        res.status(200).json({sent: true})
      })
}
