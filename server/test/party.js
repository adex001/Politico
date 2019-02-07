/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();
let adminToken;
let userToken;
const userObject = {
  email: 'adex002@gmail.com',
  password: 'password',
};

const userObject2 = {
  email: 'adex004@gmail.com',
  password: 'password',
};

describe('Gets all Parties', () => {
  it('should login an admin user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userObject)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        adminToken = response.body.data[0].token;
        done();
      });
  });
  it('should login a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userObject2)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        userToken = response.body.data[0].token;
        done();
      });
  });
  it('should return all political parties ', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
});

describe('Tests to Create Political Party', () => {
  const partyObject = {
    logoUrl: 'http://bit.ly',
    name: 'Modern Youth Political party',
    address: '21, Ilupeju road, Ikeja',
  };
  it('should create a party ', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not create party with existing party name', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('Party name already exists!');
        done();
      });
  });
});
describe('Handle Validation for Parties', () => {
  const noAddress = {
    name: 'Modern Youth Political party',
    logoUrl: 'http://bit.ly/mypp',
  };
  const noName = {
    logoUrl: 'http://bit.ly/mypp',
    address: '21, Ilupeju road, Ikeja',
  };
  const noLogo = {
    name: 'Modern Youth Political party',
    address: '21, Ilupeju road, Ikeja',
  };
  const errorToken = 'kwfmf3knfj3knfjk3nff4f4.4f4f4f4f.4f4f4f4f';
  it('should respond with error message when no token is provided', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send(noAddress)
      .end((err, response) => {
        response.body.status.should.eql(401);
        response.body.error.should.be.eql('No token provided!');
        done();
      });
  });
  it('should respond with error message when token cannot be verified', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('token', errorToken)
      .send(noAddress)
      .end((err, response) => {
        response.body.status.should.eql(401);
        response.body.error.should.be.eql('Token cannot be verified');
        done();
      });
  });
  it('should respond with error message when no address is given ', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
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
      .set('token', `${adminToken}`)
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
      .set('token', `${adminToken}`)
      .send(noName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Please, enter a valid name! Name must be greater than 3 characters');
        done();
      });
  });
});
describe('Tests to Modify Political Party', () => {
  const partyObject = {
    logoUrl: 'http://bit.ly/modified',
    name: 'Modern Youth Political party Modified',
    address: '21, Ilupeju road, Ikeja modified',
  };
  it('should modify a party ', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not modify a party with invalid partyid', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid party id');
        done();
      });
  });
  it('should not modify an invalid party ', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/100000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(partyObject)
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.eql('Update failed! party not found!');
        done();
      });
  });
});
describe('Gets a specific party', () => {
  it('should return a specific political party ', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not get party with invalid partyid', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid party id');
        done();
      });
  });
  it('should return a party not found error message ', (done) => {
    chai.request(app)
      .get('/api/v1/parties/10000000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
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
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('array');
        done();
      });
  });
  it('should not delete a party with invalid partyid', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1xx')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('invalid party id');
        done();
      });
  });
  it('should not delete a political party', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .set('token', `${userToken}`)
      .end((err, response) => {
        response.status.should.eql(403);
        response.body.status.should.eql(403);
        response.body.error.should.eql('You do not have the permission to access this resource!');
        done();
      });
  });
  it('should return an error if political does not exist ', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/10000000')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .end((err, response) => {
        response.body.status.should.eql(404);
        response.body.error.should.be.eql('party not found');
        done();
      });
  });
});
