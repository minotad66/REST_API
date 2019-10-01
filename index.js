'use strict'

const initApp = require('./src/app')
const port = process.env.PORT || 8000

const app = initApp()

app.listen(port, () => console.log('server runing'))

process.on('uncaughtException', () => console.log('Error: uncaughtException'))
process.on('unhandledRejection', () => console.log('Error: unhandledRejection'))
