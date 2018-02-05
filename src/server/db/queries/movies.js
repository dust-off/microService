const knex = require('../connection');

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
};


// SELECT * FROM items WHERE title LIKE '%some%' ORDER BY time ASC limit 100;
