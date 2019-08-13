const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;
mongoose.Promise = Promise;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: String,
  poster_path: { type: String, unique: true },
  release_date: String,
  vote_average: Number
});

var movie = mongoose.model('movie', movieSchema);

module.exports.db = db;
module.exports.movie = movie;
