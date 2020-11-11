const { assert } = require('chai');
const mongoose = require('mongoose');
const db = require('../../src/db');
const Comment = require('../../src/models/comment');

describe('Comments Model', () => {
  before((done) => {
    db.connect()
      .then(() => {
        console.log('connected database');
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('Saving comments', () => {
    afterEach((done) => {
      mongoose.connection.collections.comments.drop(() => {
        done();
      });
    });

    it('Saves a comment in database', (done) => {
      const comment = new Comment({
        text: 'A comment from user',
        name: 'Sahar',
      });
      const placeId = mongoose.Types.ObjectId('5f9fd4ec7a4dc803fc3abe86');
      comment.placeId = placeId;
      comment.save().then(() => {
        assert.equal(comment.isNew, false);
        done();
      });
    });
  });

  describe('Finding comments', () => {
    let comment;
    beforeEach((done) => {
      comment = new Comment({
        text: 'A comment from user',
        name: 'Sahar',
      });
      const placeId = mongoose.Types.ObjectId('5f9fd4ec7a4dc803fc3abe86');
      comment.placeId = placeId;
      comment.save().then(() => {
        assert.equal(comment.isNew, false);
        done();
      });
    });

    afterEach((done) => {
      mongoose.connection.collections.comments.drop(() => {
        done();
      });
    });

    it('Find record by id from database', (done) => {
      Comment.findOne({ _id: comment._id })
        .then((result) => {
          assert.deepEqual(result._id, comment._id);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
