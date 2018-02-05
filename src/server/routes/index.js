const Router = require('koa-router');

const router = new Router();
// const redis = require('../db/queries/redis');

router.get('/', async (ctx) => {
  // try {
  //   const redisData = async
  // } catch (err) {
  //
  // }
  ctx.body = {
    status: 'success',
    message: 'hello, world!',
  };
});

module.exports = router;
