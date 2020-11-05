const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  name: String,
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'place',
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('comment', commentSchema);
