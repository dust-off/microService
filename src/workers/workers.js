const queries = require('../server/db/queries/movies');
// const knex = require('../server/db/connection.js');
const db = require('../server/db/queries/pg.js');

// const bulkUpdate = (records) => {
//   queries.addBatchMovies(records)
//     .then((data) => {
//       console.log('data');
//       console.log('data');
//       console.log(data);
//     });
// };

module.exports = {
  batchProccess: async (data) => {
    // return new Promise()
    const queryArray = [];
    const { insert, mod, remove } = data;
    if (insert) {
      insert.forEach((movie) => {
        queryArray.push(`('${movie.title}', '${movie.genre}', ${movie.time}, '${movie.licensing}', ${movie.original}, ${movie.popularity})`);
      });
      const stringQuery = `INSERT INTO movies (title, genre, time, licensing, original, popularity) VALUES ${queryArray.join(', ')};`;

      const sel = 'SELECT * FROM movies WHERE title IN ($1)';
      const del = 'DELETE FROM foo WHERE id IN (select id from rows_to_delete);';
      db.query(sel, ['The Land Before Time'], (err, res) =>
        res.rows);
    }
    if (mod) {
      console.log(mod);
    }
    if (remove) {
      console.log(remove);
    }
    // return stringQuery;
  },
  batch: data =>
    // how to primisify this?
    // create objects for the success and the fails
    // create a loop function that can keep adding to them in the 'then' on success
    // when the object matches the length of the data object return it
    new Promise((resolve, reject) => {
      console.log('new Promise');
      const successes = [];
      const failures = [];
      const insertOne = async (movies) => {
        try {
          if (movies.length) {
            const results = await queries.addMovie(movies.shift);
            if (results.length) {
              console.log('successfully inserted ', results);
              successes.push(results);
            } else {
              console.log('failed to insert ', results);
              failures.push(results);
            }
            if (successes.length + failures.length === movies.length) {
              resolve([successes, failures]);
            } else {
              insertOne(movies);
            }
          }
        } catch (err) {
          //
        }
      };

      insertOne(data.insert);
    }),
};

// title: 'Titanic 2',
// genre: JSON.stringify(['dramas', 'international', 'action']),
// time: 555001,
// licensing: JSON.stringify(['Africa', 'Europe', 'Australia']),
// original: false,
// popularity: 456,
