module.exports = ({models, mailgun}) => (req, res) => {
  const permalink = req.params.permalink
  const verify_token = req.params.verify_token
    models.User.findOne({ where: { permalink: permalink }})
      .then(user => {
        if(user.verify_token === verify_token) {
          models.User.update({ verified: true }, { where: { permalink: permalink } })
            .then(updatedUser => {
              const verified = {
                subscribed: true,
                name: user.name,
                address: user.email
              }
              mailgun.lists('news@mg.luvpay.io').members().create(verified, (err, data) => {
                if(err) {
                  console.log(err);
                }
                res.redirect('/')
              })
            })
      } else {
        res.status(200).send('Invalid verification token. Please try again or contact support.')
      }
    })
    .catch(err => {
      res.redirect('/')
    })
}
