const app = require('./app');
const db = require('./db');

const port = process.env.PORT || 3000;

db.connect().then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log('server is running');
  });
});
