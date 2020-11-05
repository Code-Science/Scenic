const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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

// const addData = async () => {
//   const place = new Place({
//     title: 'Banff National Park',
//     img1:
//       'https://images.unsplash.com/photo-1587472944108-b825ae03cb0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2767&q=80',
//     img2:
//       'https://images.unsplash.com/photo-1531509519770-55e7459de67c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
//     img3:
//       'https://images.unsplash.com/photo-1570785393905-63010f7f1b57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
//     img4:
//       'https://images.unsplash.com/photo-1552186120-e36d638b3b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
//   });
//   await place.save();
// };

// error handling mongoose

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

app.get('/', function (req, res) {
  res.render('landingPage');
});

app.get('/places', async (req, res) => {
  const places = await Place.find({});
  res.render('places', { places });
});

app.get('/places/:id', async (req, res) => {
  const place = await Place.findById(req.params.id);
  const comments = await Comment.find({ placeId: req.params.id });

  res.render('placeDetails', { place, comments });
});

app.post('/places/:id', async (req, res) => {
  const place = await Place.findById(req.params.id);
  const placeId = mongoose.Types.ObjectId(place._id);
  req.body.comment.placeId = placeId;
  const comment = new Comment(req.body.comment);
  await comment.save();
  res.redirect(`/places/${req.params.id}`);
});

app.delete('/places/:id', async (req, res) => {
  const deletedComment = await Comment.findByIdAndRemove(req.params.id);
});

app.listen(port, () => {
  console.log('server is running');
});
