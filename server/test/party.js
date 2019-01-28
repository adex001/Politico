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
describe('Deletes a specific Political Party', () => {
  it('should delete a political party', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should return an error if political does not exist ', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/10000000')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.be.eql('party not found');
        done();
      });
  });
});
describe('Tests to Create Political Party', () => {
  const partyObject = {
    logo: 'http://bit.ly',
    name: 'Modern Youth Political party',
    address: '21, Ilupeju road, Ikeja',
  };
  it('should create an office ', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
});
describe('Handle Validation for Parties', () => {
  const noAddress = {
    name: 'Modern Youth Political party',
    logo: 'http:bit.ly/mypp',
  };
  const noName = {
    logo: 'http:bit.ly/mypp',
    address: '21, Ilupeju road, Ikeja',
  };
  const noLogo = {
    name: 'Modern Youth Political party',
    address: '21, Ilupeju road, Ikeja',
  };
  it('should respond with error message when no address is given ', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send(noAddress)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid address and address must be greater than 5 characters');
        done();
      });
  });
  it('should respond with error when no logo is given', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send(noLogo)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid logo URL!');
        done();
      });
  });
  it('should respond with error when no party name is provided ', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send(noName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid name! Name must be greater than 3 characters');
        done();
      });
  });
});
