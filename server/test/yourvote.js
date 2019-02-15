/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

let adminToken;
chai.use(chaiHttp);
chai.should();
describe('Users should be able to VOTE for a candidate', () => {
  const login = {
    email: 'adex002@gmail.com',
    password: 'password',
  };
  const voteObject = {
    candidateid: 1,
    officeid: 2,
  };
  it('should login to get an admin token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(login)
      .end((err, response) => {
        response.body.status.should.eql(200);
        adminToken = response.body.data[0].token;
        done();
      });
  });
  it('should vote for a candidate', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(voteObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
});
