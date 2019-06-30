//SELECT one db to work with
//For SQL
const { sqlDb } = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb');
const { movie } = require('../../db/mongodb');

module.exports = {
  // SQL MODELS
  SqlGet: (req, res) => {
    sqlDb.query(`SELECT * FROM favorites`, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(data);
      }
    });
  },

  // SqlInsert: (movie,
  // (req, res) => {
  //   sqlDb.query(
  //     `INSERT INTO favorites (movie_id, title, poster_path, release_date, popularity) VALUES (?, ?, ?, ?, ?)`,
  //     [movie_id, title, poster_path, release_date, popularity],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.sendStatus(500);
  //       } else {
  //         res.sendStatus(201);
  //       }
  //     }
  //   );
  // }),
  // { movie_id, title, poster_path, release_date, popularity }

  // SqlDelete: () => {

  // },

  // MONGO MODELS
  save: favorite => {
    // console.log('POSTER PATHSDSADSA', favorite.poster_path);
    return movie
      .findOneAndUpdate(
        { poster_path: favorite.poster_path },
        {
          title: favorite.title,
          poster_path: favorite.poster_path,
          release_date: favorite.release_date,
          vote_average: favorite.vote_average
        },
        { upsert: true }
      )
      .exec();
  },

  find: () => {
    return movie
      .find()
      .sort({ vote_average: 1 })
      .exec();
  },

  deleted: favorite => {
    return movie.deleteOne({ title: favorite });
  }
};
