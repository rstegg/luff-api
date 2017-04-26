const { pick } = require('ramda')

const validate = (User, req) => {
  return User.findOne({
      where: { username: req.params.id }
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : user
  )
}

module.exports = ({models}) => (req, res) => {
  validate(models.User, req)
    .then(validatedUser => {
        const profile = pick(['id', 'name', 'username', 'image', 'bio'], validatedUser)
        res.status(200).json({profile})
    })
    .catch(error => res.status(400).json({error}))
}
