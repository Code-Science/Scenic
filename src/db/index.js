const mongoose = require('mongoose');

let dbUrl = 'mongodb://localhost:27017/scenic';
dbUrl =
  'mongodb+srv://sunlight:electron@cluster0.945ij.azure.mongodb.net/places?retryWrites=true&w=majority';

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      dbUrl =
        'mongodb+srv://sunlight:electron@cluster0.945ij.azure.mongodb.net/tests?retryWrites=true&w=majority';
    }
    mongoose
      .connect(dbUrl, {
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
