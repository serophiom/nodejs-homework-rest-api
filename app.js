const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./src/routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

// GET /api/contacts
// GET /api/contacts/:contactId
// POST /api/contacts
// DELETE /api/contacts/:contactId
// PUT /api/contacts/:contactId

module.exports = app
