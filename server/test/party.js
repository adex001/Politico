/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Gets all Parties', () => {
  it('should return all political parties ', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
});

describe('Gets a specific party', () => {
  it('should return a specific political party ', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should return a party not found error message ', (done) => {
    chai.request(app)
      .get('/api/v1/parties/10000000000')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.eql('party not found');
        done();
      });
  });
});
