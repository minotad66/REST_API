'use strict'

const express = require('express')
const bodyParse = require('body-parser')

const initPostRouter = require('./routes/post')

const app = express()

app.use(bodyParse.json())

function initApp () {
  initPostRouter(app)

  return app
}

module.exports = initApp
