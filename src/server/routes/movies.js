const Router = require('koa-router');
const queries = require('../db/queries/movies');
const worker = require('../../workers/workers.js');

const router = new Router();
const BASE_URL = '/api/v1/movies';

router.get(`${BASE_URL}/all`, async (ctx) => {
  try {
    const movies = await queries.getAllMovies();
    ctx.body = {
      status: 'success',
      data: movies,
    };
  } catch (err) {
    console.log(err);
  }
});

const dbError = (ctx) => {
  ctx.status = 404;
  ctx.body = {
    status: 'error',
    message: 'That movie does not exist.',
  };
};

const sendMovie = (ctx, movie) => {
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: movie,
  };
};

const serverError = (ctx, err) => {
  ctx.status = 400;
  ctx.body = {
    status: 'error',
    message: err.message || 'Sorry, an error has occurred.',
  };
};

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.getSingleMovie(ctx.params.id);
    if (movie.length) {
      sendMovie(ctx, movie);
    } else {
      dbError(ctx);
    }
  } catch (err) {
    serverError(ctx, err);
  }
});

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    // const string = await worker.batchProccess(ctx.request.body);
    // worker.batch(ctx.request.body)
    //   .then((data) => {
    //     console.log(data);
    //   });
    const movie = ctx.request.body.insert;
    // text, params, callback
    // console.log(string);
    // const resposne = queries.batchQuery(string, [], (err, res) => {
    //   console.log(err, res);
    // });
    // const movie = await queries.batchQuery(string);
    // console.log('');
    // console.log('test');
    // console.log(knex('movies').count('*'));
    //
    // // console.log();
    // // const movie = away .queries.addBatchMovies()
    // console.log('returned to router @ 62', movie);
    if (movie.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movie,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    // console.log(err);
    serverError(ctx, err);
  }
});

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      sendMovie(ctx, movie);
    } else {
      dbError(ctx);
    }
  } catch (err) {
    serverError(ctx, err);
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.removeMovie(ctx.params.id);
    if (movie.length) {
      sendMovie(ctx, movie);
    } else {
      dbError(ctx);
    }
  } catch (err) {
    serverError(ctx, err);
  }
});

router.get(`${BASE_URL}/search/:title`, async (ctx) => {
  try {
    const movie = await queries.searchMovie(ctx.params.title);
    if (movie.length) {
      sendMovie(ctx, movie);
    } else {
      dbError(ctx);
    }
  } catch (err) {
    serverError(ctx, err);
  }
});

module.exports = router;
