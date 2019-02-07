/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

let adminToken;
chai.use(chaiHttp);
chai.should();
describe('Users should be able to express interest for a government office', () => {
  const expressObject = {
    officename: 'Councillor',
    partyname: 'Peoples Democratic Party',
  };
  const login = {
    email: 'adex002@gmail.com',
    password: 'password',
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
  it('should create an office ', (done) => {
    const officeObject = {
      type: 'state',
      name: 'Councillor',
      description: 'Office of the Governor of Lagos State',
    };
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
  const partyObject = {
    logoUrl: 'http://bit.ly',
    name: 'Peoples Democratic Party',
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
  it('should return an error when you express interest for another user ', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(expressObject)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('you cannot express interest for another user');
        done();
      });
  });
  it('should express interest for an office', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(expressObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
});
describe('Handle invalid datas', () => {
  const invalidOfficeName = {
    officename: 'er',
    partyname: 'Modern Youth Political party',
  };
  const invalidPartyName = {
    officename: 'errorororororororororrrrrrrrrrrrrr',
    partyname: 'ee',
  };
  it('should return an error when invalid office name is presented', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(invalidOfficeName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('Please, enter a valid office name! Office Name must be greater than 3 characters');
        done();
      });
  });
  it('should return an error when invalid party name is presented', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('Accept', 'application/json')
      .set('token', `${adminToken}`)
      .send(invalidPartyName)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.eql('Please, enter a valid party name! Party Name must be greater than 3 characters');
        done();
      });
  });
});
