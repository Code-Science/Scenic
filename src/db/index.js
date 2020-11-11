if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

let url = process.env.dataBaseURL || 'mongodb://localhost:27017/scenic';

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      url = 'mongodb://localhost:27017/tests';
    }
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        return resolve();
      });
  });
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = {
  connect,
  close,
};
