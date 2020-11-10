const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const compression = require('compression');
const { validateComment } = require('./middlewares');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Place = require('./models/place');
const Comment = require('./models/comment');

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(compression());
mongoose.set('useFindAndModify', false);

app.get('/', function (req, res) {
  res.render('landingPage');
});

app.get(
  '/places',
  catchAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places', { places });
  })
);

app.get(
  '/places/:id',
  catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    const comments = await Comment.find({ placeId: req.params.id });

    res.render('placeDetails', { place, comments });
  })
);

app.post(
  '/places/:id/comments',
  validateComment,
  catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    const placeId = mongoose.Types.ObjectId(place._id);
    req.body.comment.placeId = placeId;
    const comment = new Comment(req.body.comment);
    await comment.save();
    res.redirect(`/places/${req.params.id}`);
  })
);

app.delete(
  '/places/:id/comments/:commentId',
  catchAsync(async (req, res) => {
    await Comment.findByIdAndRemove(req.params.commentId);
    res.redirect(`/places/${req.params.id}`);
  })
);

app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
});

module.exports = app;
