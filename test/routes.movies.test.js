process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

const BASE_URL = '/api/v1/movies';

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomEntry = dbTitle => new Promise((resolve) => {
  knex(dbTitle).count('*')
    .then((num) => {
      const { count } = num[0];
      knex('movies')
      // get a random movie based on the count
        .where('id', getRandomInt(1, count - 1))
        .then(movie => resolve({ movie, count }));
    });
});

describe('routes : movies', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('GET /api/v1/movies/all', () => {
    it('should return all movies', (done) => {
      getRandomEntry('movies')
        .then(({ movie, count }) => {
          chai.request(server)
            .get(`${BASE_URL}/all`)
            .end((err, res) => {
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": [3 movie objects]}
              res.body.data.length.should.eql(count * 1);
              // the first object in the data array should
              // have the right keys
              res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
              done();
            });
        });
    });
  });
  describe('GET /api/v1/movies/:id', () => {
    it('should respond with a single movie', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/1`)
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 movie object}
          res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
          done();
        });
    });
    it('should respond with missing movie', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/99999`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          res.body.message.should.eql('That movie does not exist.');
          done();
        });
    });
  });
  describe('POST /api/v1/movies/', () => {
    it('should insert a movie into the db', (done) => {
      chai.request(server)
        .post(`${BASE_URL}`)
        .send({
          title: 'Titanic 2',
          genre: JSON.stringify(['dramas', 'international', 'action']),
          time: 555001,
          licensing: JSON.stringify(['Africa', 'Europe', 'Australia']),
          original: false,
          popularity: 456,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
          done();
        });
    });
    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
        .post(`${BASE_URL}`)
        .send({
          name: 'Titanic',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          should.exist(res.body.message);
          done();
        });
    });
  });
  describe('PUT /api/v1/movies', () => {
    it('should return the movie that was updated', (done) => {
      getRandomEntry('movies')
        .then(({ movie, count }) => {
          const movieObject = movie[0];
          let newRating = 0;
          // make sure the new popularity is a valid popularity number
          if (movieObject.popularity > 1) {
            newRating = movieObject.popularity - 1;
          } else {
            newRating = 1;
          }
          chai.request(server)
            .put(`${BASE_URL}/${movieObject.id}`)
          // update the popularity by subtracting 1
            .send({
              popularity: newRating,
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
              const newMovieObject = res.body.data[0];
              newMovieObject.popularity.should.not.eql(movieObject.popularity);
              done();
            });
        });
      // });
    });
    it('should throw an error if the movie does not exist', (done) => {
      chai.request(server)
        .put(`${BASE_URL}/9999999`)
        .send({
          popularity: 9,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          res.body.message.should.eql('That movie does not exist.');
          done();
        });
    });
  });
  describe('DELETE /api/v1/movies/:id', () => {
    it('should return the movie that was deleted', (done) => {
      getRandomEntry('movies')
        .then(({ movie, count }) => {
          const movieObject = movie[0];
          const lengthBeforeDelete = count;
          chai.request(server)
            .delete(`${BASE_URL}/${movieObject.id}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
              getRandomEntry('movies')
                .then(({ movie, count }) => {
                  (count * 1).should.eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it('should throw an error if the movie does not exist', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/9999999`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          res.body.message.should.eql('That movie does not exist.');
          done();
        });
    });
  });
  describe('GET-search /api/v1/movies/search/:title', () => {
    it('should return an array of results', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/search/age`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'title', 'genre', 'time', 'licensing', 'original', 'popularity');
          res.body.data.length.should.equal(1);
          done();
        });
    });
    it('should return an error if no movie is found', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/search/zzzz`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.message.should.eql('That movie does not exist.');
          done();
        });
    });
  });
});
