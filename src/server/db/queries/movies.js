const knex = require('../connection');
// const pg = require('./pg.js');

module.exports = {
  getAllMovies: () => knex('movies')
    .select('*'),

  getSingleMovie: id => knex('movies')
    .select('*')
    .where({ id: parseInt(id, 10) }),

  addMovie: movie => knex('movies')
    .insert(movie)
    .returning('*'),

  updateMovie: (id, movie) => knex('movies')
    .update(movie)
    .where({ id: parseInt(id, 10) })
    .returning('*'),

  removeMovie: id => knex('movies')
    .del()
    .where({ id: parseInt(id, 10) })
    .returning('*'),

  searchMovie: title => knex('movies')
    .where('title', 'ILIKE', `%${title}%`)
    .orderBy('time', 'ASC')
    .limit(100)
    .returning('*'),

  addBatchMovies: rows =>
    knex.batchInsert('movies', rows)
      .returning('*'),

  // rawBatch: data =>
  //   knex.

  // batchQuery: (text, params, callback) => pg.query(text, params, callback),
};
