const queries = require('../server/db/queries/movies');
// const knex = require('../server/db/connection.js');

// const bulkUpdate = (records) => {
//   queries.addBatchMovies(records)
//     .then((data) => {
//       console.log('data');
//       console.log('data');
//       console.log(data);
//     });
// };

module.exports = {
  batchProccess: (data) => {
    const queryArray = [];
    const { insert, mod, remove } = data;
    if (insert) {
      insert.forEach((movie) => {
        queryArray.push(`('${movie.title}', '${movie.genre}', ${movie.time}, '${movie.licensing}', ${movie.original}, ${movie.popularity})`);
      });

      const stringQuery = `INSERT INTO movies (title, genre, time, licensing, original, popularity) VALUES ${queryArray.join(', ')};`;

      return stringQuery;

      // queries.batchQuery(stringQuery)
      //   .then((response) => {
      //     console.log('response');
      //     console.log('response in workers @ 23');
      //     console.log(response);
      //   });
    }
    if (mod) {
      console.log(mod);
    }
    if (remove) {
      console.log(remove);
    }
    // return stringQuery;
  },
  // batch: (data) => {
  //   // how to primisify this?
  //   // create objects for the success and the fails
  //   // create a loop function that can keep adding to them in the 'then' on success
  //   // when the object matches the length of the data object return it
  //   const test = new Promise((resolve, reject) => {
  //     const temp = data.insert[0];
  //     if (temp.title) {
  //       resolve(temp);
  //     } else {
  //       reject(temp);
  //     }
  //   });
  //   return test;
  // },
};

// title: 'Titanic 2',
// genre: JSON.stringify(['dramas', 'international', 'action']),
// time: 555001,
// licensing: JSON.stringify(['Africa', 'Europe', 'Australia']),
// original: false,
// popularity: 456,
