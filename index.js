require('dotenv').load()

const path = require('path')
const express = require('express')
const app = express()
const compress = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const Sequelize = require('sequelize')
const passport = require('passport')
const configureApi = require('./api/v1')

app
  .use(compress())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
})

const models = db.import(__dirname + '/models')

Object.keys(models)
  .map(name => models[name])
  .filter(model => model.associate)
  .forEach(model => model.associate(models))

db.sync({force: true})

const port = process.env.PORT || 3000
http.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

const apiOptions = {
  app: app,
  models: models,
  passport: passport
}

configureApi(apiOptions)

app.use(express.static('./build'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})
