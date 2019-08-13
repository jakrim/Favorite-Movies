CREATE TABLE favorites (-- SET UP SCHEMA HERE
  movie_id INT(11) NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255) NOT NULL,
  release_date VARCHAR(255) NOT NULL,
  popularity INT(11) NOT NULL
  PRIMARY KEY (movie_id),
);