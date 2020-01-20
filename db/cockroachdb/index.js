var async = require('async');
var fs = require('fs');
var pg = require('pg');

// Connect to the "goodmovies" database.
var config = {
  user: 'jesse',
  host: 'localhost',
  database: 'goodmovies',
  port: 26257,
  ssl: {
    ca: fs.readFileSync('my-safe-directory/certs/ca.crt').toString(),
    key: fs.readFileSync('my-safe-directory/certs/client.jesse.key').toString(),
    cert: fs.readFileSync('my-safe-directory/certs/client.jesse.crt').toString()
  }
};

// Create a pool.
var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
  // Close communication with the database and exit.
  console.log('Connecting to cockroach');
  var finish = function() {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  async.waterfall(
    [
      function(next) {
        // Create the 'accounts' table.
        client.query(
          'CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);',
          next
        );
        // client.query('CREATE TABLE IF NOT EXISTS favorites (movie_id INT PRIMARY KEY, title VARCHAR, poster_path VARCHAR, release_date VARCHAR, popularity INT);', next);
      },
      function(results, next) {
        // Insert two rows into the 'accounts' table.
        client.query(
          'INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);',
          next
        );
      },
      function(results, next) {
        // Print out account balances.
        client.query('SELECT id, balance FROM accounts;', next);
      }
    ],
    function(err, results) {
      if (err) {
        console.error(
          'Error inserting into and selecting from accounts: ',
          err
        );
        finish();
      }

      console.log('Initial balances:');
      results.rows.forEach(function(row) {
        console.log(row);
      });

      finish();
    }
  );
});
