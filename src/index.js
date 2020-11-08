const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const compression = require('compression');
const { commentSchema } = require('./JoiSchemas/schemas');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Place = require('./models/place');
const Comment = require('./models/comment');

const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/scenic', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(
  'mongodb+srv://sunlight:electron@cluster0.945ij.azure.mongodb.net/places?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(compression());

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, message);
  } else {
    next();
  }
};

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

// app.use((req, res) => {
//   res
//     .status(404)
//     .send(`<h1 style='text-align:center;margin-top:10vh;'>NOT FOUND!</h1>`);
// });

app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
  console.log('server is running');
});
