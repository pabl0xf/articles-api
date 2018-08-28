'use strict';

const env = require('dotenv');
const server = require('../server');
const mongoose = require('mongoose');
const User = require('../app/models/user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  afterEach((done) => {
    User.remove({}).exec()
      .then(() => {
        console.log('Users collection is now empty.');
        done();
      })
      .catch((error) => {
        console.log('Error while cleaning the users collection.', error);
      });
  });

  describe('POST /users', () => {
    it('should fail the validation', (done) => {
      chai.request(server)
        .post('/users')
        .set('Authentication', process.env.AUTH_TOKEN)
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          done();
        });
    });

    it('should create the user', (done) => {
      const user = {
        name: 'Pedro Guzman',
        avatar: 'https://www.off2class.com/wp-content/uploads/2015/11/Off2class-AvatarProfilePic-01-Colour-James.jpg'
      };

      chai.request(server)
        .post('/users')
        .set('Authentication', process.env.AUTH_TOKEN)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('avatar');
          res.body.name.should.be.eql(user.name);
          res.body.avatar.should.be.eql(user.avatar);
          done();
        });
    });

    it('should not authorized the action', (done) => {
      chai.request(server)
        .post('/users')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
