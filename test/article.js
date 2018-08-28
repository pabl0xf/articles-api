'use strict';

const env = require('dotenv');
const server = require('../server');
const mongoose = require('mongoose');
const Article = require('../app/models/article.model');
const User = require('../app/models/user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Use chai http
chai.should();
chai.use(chaiHttp);

describe('Articles', () => {
  before((done) => {
    const user = new User({ name: 'Test' });
    user.save()
      .then(() => {
        console.log('User created for all articles tests.');
        done();
      })
      .catch(() => {
        console.log('Could not create user before articles tests.');
      });
  });

  after((done) => {
    User.remove({}).exec()
      .then(() => {
        console.log('User collection is now empty.');
        done();
      })
      .catch((error) => {
        console.log('Error while cleaning the users collection.', error);
      });
  });

  beforeEach((done) => {
    User.findOne({ name: 'Test' }).exec()
      .then(({ _id }) => {
        const article = new Article({
          user: _id,
          title: 'Test article',
          text: 'This is the text article text',
          tags: ['tag1', 'tag2']
        });

        article.save()
          .then(() => {
            console.log('Article created before article test.');
            done();
          })
          .catch(() => {
            console.log('Could not create article before article test.');
          });
      })
      .catch(() => {
        console.log('Could not get user created before.');
      });
  });

  afterEach((done) => {
    // Empty the database before each test
    Article.remove({}).exec()
      .then(() => {
        console.log('Articles collection is now empty.');
        done();
      })
      .catch((error) => {
        console.log('Error while cleaning the articles collection.', error);
      });
  });

  describe('DELETE /articles', () => {
    it('should not authorize the action', (done) => {
      chai.request(server)
        .delete('/articles/invalidObjectId')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should respond bad request if invalid object id', (done) => {
      chai.request(server)
        .delete('/articles/invalidObjectId')
        .set('Authentication', process.env.AUTH_TOKEN)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should respond not found if the article does not exist', (done) => {
      const fakeId = mongoose.Types.ObjectId();
      chai.request(server)
        .delete(`/articles/${fakeId}`)
        .set('Authentication', process.env.AUTH_TOKEN)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should delete the article', (done) => {
      Article.findOne({ title: 'Test article' }).exec()
        .then(({ _id }) => {
          chai.request(server)
            .delete(`/articles/${_id}`)
            .set('Authentication', process.env.AUTH_TOKEN)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.message.should.be.a('string');

              done();
            });
        });
    });
  });
});