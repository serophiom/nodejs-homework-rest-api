const mongoose = require('mongoose');
require('dotenv').config();
let uri;

if (process.env.NODE_ENV == 'test') {
  uri = process.env.URI_DB_TEST
} else {
  uri = process.env.URI_DB;
};

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

if (process.env.NODE_ENV == 'test') {
  mongoose.connection.on('connected', () => {
    console.log('Database connection successful')
  });

  mongoose.connection.on('error', (error) => {
    console.log(`Database connection error ${error.message}`)
  });
}

process.on('SIGINT', async() => {
  await mongoose.connection.close()
  console.log('Database connection closed')
  process.exit(1)
})

module.exports = db
