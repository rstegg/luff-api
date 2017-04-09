require('dotenv').load()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const Sequelize = require('sequelize')
const passport = require('passport')
const configureApi = require('./api/v1')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

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

const port = process.env.PORT || 3030
http.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

const apiOptions = {
  app: app,
  models: models,
  passport: passport
}

configureApi(apiOptions)
