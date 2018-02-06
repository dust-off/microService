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
    const movie = await worker.batchProccess(ctx.request.body);
    // const movie = ctx.request.body.insert;
    // const movie = string;
    if (movie.length) {
      console.log('Something worked!!!');
      console.log('    This is the ressult');
      console.log(movie);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movie,
      };
    } else {
      console.log('??? Fail');
      console.log('    This is the ressult');
      console.log(movie);
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    console.log('WTF why did the erver have an issue?');
    console.log(err);
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
