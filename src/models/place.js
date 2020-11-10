const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  title: String,
  country: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
});

module.exports = mongoose.model('place', PlaceSchema);
