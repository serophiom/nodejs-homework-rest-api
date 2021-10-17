const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');

const contactsRouter = require('./src/routes/contacts/contacts');
const usersRouter = require('./src/routes/users/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  })
});

app.use((error, req, res, next) => {
  // if (error.name === "ValidationError") {
  //   return res
  //     .status(400)
  //     .json({ status: "error", code: 400, message: error.message });
  // }
  res.status(500).json({ status: "fail", code: 500, message: error.message });
});

module.exports = app;