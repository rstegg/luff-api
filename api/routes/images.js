const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

module.exports = function(app, options) {
  const { models, API_HOST, passport, jwt } = options

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'payup-storage',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.user.id + '__' + Date.now().toString())
      }
    })
  })

  app.post(`${API_HOST}/profile/avatar`, upload.single('avatar'), function(req, res) {
    console.log(req.file);
    // models.User.update({image: }{ where: { id: req.user.id } })
    //   .then(function(profile) {
    //     res.status(200).json({profile})
    //   })
    //   .catch(function(err) {
    //     res.status(400).json({error: 'Bad request'})
    //   })
  })

  app.put(`${API_HOST}/profile`, passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.body.profile && req.user) {
      if(req.user.id !== req.body.profile.id) {
        res.status(400).json({error: 'Invalid credentials'})
      }
      if(!req.body.profile.id) {
        res.status(400).json({error: 'Missing parameters'})
      }
      models.User.update(req.body.profile, { where: { id: req.user.id } })
        .then(function(payment) {
          res.status(200).json({payment})
        })
        .catch(function(err) {
          res.status(400).json({error: 'Bad request'})
        })
    } else {
      res.status(400).json({error: 'Bad request'})
    }
  })
}
