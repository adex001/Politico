/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Tests for the Create Government office', () => {
  const officeObject = {
    type: 'state',
    name: 'Governor',
    description: 'Office of the Governor of Lagos State',
  };
  it('should create an office ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .send(officeObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
});
describe('Handle Input Parameters', () => {
  const noType = {
    name: 'Governor',
    description: 'Office of the Governor of Lagos State',
  };
  const noDesc = {
    name: 'Governor',
    type: 'federal',
  };
  const noName = {
    type: 'state',
    description: 'Official governor of the state'
  }
  it('should respond with error message ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .send(noType)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid office type! Type must be federal, legislative, state or local');
        done();
      });
  });
  it('should respond with error ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .send(noDesc)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid description! Description must be greater than 5 characters');
        done();
      });
  });
  it('should respond with error ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .send(noName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid name! Name must be greater than 3 characters');
        done();
      });
  });
});
