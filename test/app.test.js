const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const Place = require('../src/models/place');
const Comment = require('../src/models/comment');

describe('Get routes', () => {
  before((done) => {
    db.connect()
      .then(() => {
        // console.log('connected database');
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });
  describe('"/" route', () => {
    it('Ok, Render with 200 status code', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(done);
    });
  });

  describe('"/places" route', () => {
    it('Ok, Render with 200 status code', (done) => {
      request(app)
        .get('/places')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(done);
    });
  });

  describe('"/places/:id" route', () => {
    let id;

    before((done) => {
      const place = new Place({
        title: 'Desert',
        country: 'Africa',
      });
      place.save().then(() => {
        assert.equal(place.isNew, false);
        id = place._id;
        done();
      });
    });

    after((done) => {
      mongoose.connection.collections.places.drop(() => {
        done();
      });
    });
    it('Ok, Render with 200 status code', (done) => {
      request(app)
        .get(`/places/${id}`)
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(done);
    });
  });
});

describe('POST route "/places/:id/comments" ', () => {
  let id;
  before((done) => {
    db.connect()
      .then(() => {
        // console.log('connected database');
        const place = new Place({
          title: 'Desert',
          country: 'Africa',
        });
        place.save().then(() => {
          assert.equal(place.isNew, false);
          id = place._id;
          done();
        });
      })
      .catch((err) => done(err));
  });

  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.collections.places.drop(() => {
      mongoose.connection.collections.comments.drop(() => {
        db.close()
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });

  it('Creates a new comment in database', (done) => {
    request(app)
      .post(`/places/${id}/comments`)
      .send({
        comment: {
          name: 'testCheck',
          text: 'A comment from user',
        },
      })
      .expect(302) // For redirect
      .then(() => {
        Comment.find({ placeId: id })
          .then((result) => {
            // console.log(result);
            assert.lengthOf(result, 1, 'result has length of 1');
            const [body] = result;
            assert.isObject(body, 'request body is an object');
            assert.property(body, '_id');
            assert.property(body, 'time');
            assert.property(body, 'text');
            assert.property(body, 'name');
            assert.propertyVal(body, 'name', 'testCheck');
            assert.property(body, 'placeId');

            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Ok, Redirect to "/places/:id" with 302 status code', (done) => {
    request(app)
      .post(`/places/${id}/comments`)
      .send({
        comment: {
          name: 'testCheck',
          text: 'A comment from user',
        },
      })
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('location', `/places/${id}`)
      .end(done);
  });

  it('Fail on incomplete inputs, render Error page with 400 status code', (done) => {
    request(app)
      .post(`/places/${id}/comments`)
      .send({
        comment: {
          name: 'testCheck',
        },
      })
      .expect(400)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(done);
  });
});

describe('DELETE route "/places/:id/comments/:commentId" ', () => {
  let id;
  let commentId;
  before((done) => {
    db.connect()
      .then(() => {
        // console.log('connected database');

        // creating a new place
        const place = new Place({
          title: 'Desert',
          country: 'Africa',
        });
        place
          .save()
          .then(() => {
            assert.equal(place.isNew, false);
            id = place._id;
            // creating new comment
            const comment = new Comment({
              text: 'A comment from user',
              name: 'Sahar',
            });
            const placeId = mongoose.Types.ObjectId(id);
            comment.placeId = placeId;
            commentId = comment._id;
            comment.save().then(() => {
              assert.equal(comment.isNew, false);
              done();
            });
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  after((done) => {
    mongoose.connection.collections.places.drop(() => {
      mongoose.connection.collections.comments.drop(() => {
        db.close()
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });

  it('Deletes a selected comment from database by id', (done) => {
    // Initial comment data in database
    Comment.find()
      .then((result) => {
        assert.isArray(result);
        assert.lengthOf(result, 1, 'result has length of 1');

        request(app)
          .delete(`/places/${id}/comments/${commentId}`)
          .expect(302) // For redirect
          .then(() => {
            Comment.find()
              .then((res) => {
                assert.isEmpty(res);
                done();
              })
              .catch((err) => {
                done(err);
              });
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => done(err));
  });

  it('Ok, Redirect to "/places/:id" with 302 status code', (done) => {
    request(app)
      .delete(`/places/${id}/comments/${commentId}`)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('location', `/places/${id}`)
      .end(done);
  });
});
