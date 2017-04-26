const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = (p) => (obj) => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('name'),
        validField('amount_type'),
        validField('is_public')
    ]))

const getValidSlug = (Luv, slug) =>
  new Promise(resolve =>
    Luv.findOne({
      where: { slug }
    })
    .then(luv => {
      if(luv) {
        console.log(slug);
        return resolve(getValidSlug(Luv, `${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = (Luv, req) => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(Luv, slug)
}

module.exports = ({models}) => (req, res) => {
  validate(models.Luv, req)
    .then(slug => {
      console.log(slug);
      const safeLuv = merge({
        userId: req.user.id,
        amount: req.body.amount || '',
        image: req.body.image || '',
        description: req.body.description || '',
        slug
      }, pick(['name', 'amount_type', 'is_public'], req.body))
      models.Luv.create(safeLuv)
        .then(luv => res.status(200).json({luv}))
    })
    .catch((error) => res.status(400).json({error}))
}
