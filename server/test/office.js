/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRleDAwMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NDk0NTExNzh9.bIohzogjDYx1ic2cOnqBRfcusYl1I12dumcgRZKO8fA';
chai.use(chaiHttp);
chai.should();

// Login to get token
const userObject = {
  email: 'adex002@gmail.com',
  password: 'password',
};

describe('Tests for the Create Government office', () => {
  const officeObject = {
    type: 'state',
    name: 'Chairman',
    description: 'Office of the Chairman of Lagos State',
  };
  it('should login a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userObject)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should create an office ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(officeObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not create an existing office ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(officeObject)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('office name exists already! try another');
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
    description: 'Official governor of the state',
  };
  it('should respond with error message ', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
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
      .set('token', `${adminToken}`)
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
      .set('token', `${adminToken}`)
      .send(noName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid name! Name must be greater than 3 characters');
        done();
      });
  });
});

describe('Gets all Offices', () => {
  it('should return all government offices ', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
});

describe('Gets a specific Office', () => {
  it('should return a specific government office ', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not get an office with invalid url ', (done) => {
    chai.request(app)
      .get('/api/v1/offices/2xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid office id');
        done();
      });
  });
  it('should return an error if government office does not exist ', (done) => {
    chai.request(app)
      .get('/api/v1/offices/10000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.be.eql('No such office');
        done();
      });
  });
});


describe('Modify a specific government Office', () => {
  const updateOffice = {
    type: 'federal',
    name: 'President',
    description: 'I am the updated part',
  };
  it('should modify a government office ', (done) => {
    chai.request(app)
      .patch('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(updateOffice)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not modify an office with invalid url ', (done) => {
    chai.request(app)
      .patch('/api/v1/offices/1xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(updateOffice)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid office id');
        done();
      });
  });
  it('should return an error if government office does not exist ', (done) => {
    chai.request(app)
      .patch('/api/v1/offices/10000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(updateOffice)
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.be.eql('office not found');
        done();
      });
  });
});

describe('Deletes a specific government Office', () => {
  it('should delete a government office ', (done) => {
    chai.request(app)
      .delete('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not delete an office with invalid url ', (done) => {
    chai.request(app)
      .delete('/api/v1/offices/2xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid office id');
        done();
      });
  });
  it('should return an error if government office does not exist ', (done) => {
    chai.request(app)
      .delete('/api/v1/offices/10000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.be.eql('Office does not exist');
        done();
      });
  });
});
