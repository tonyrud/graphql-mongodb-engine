const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://mongodb/recipes'

const connectWithRetry = () => {
  return mongoose.connect(MONGO_URI, err => {
    if (err) {
      console.error(
        'Failed to connect to mongo on startup - retrying in 5 sec',
        err
      )
      setTimeout(connectWithRetry, 5000)
    } else {
      console.log('Connected to local mongo instance')
    }
  })
}

mongoose.Promise = global.Promise

module.exports = connectWithRetry
