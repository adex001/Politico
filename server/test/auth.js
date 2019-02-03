/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();
describe('Tests to create a User', () => {
  const userObject = {
    email: 'adex002@gmail.com',
    firstname: 'Adeoye',
    lastname: 'Ebenezer',
    password: 'MyPassword',
    isAdmin: 'true',
  };
  it('should create a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(userObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('array');
        done();
      });
  });
});
describe('Handle Input Parameters', () => {
  const noEmail = {
    firstname: 'Adeoye',
    lastname: 'Ebenezer',
    password: 'MyPassword',
  };
  const noFirstname = {
    email: 'adex003@gmail.com',
    lastname: 'Ebenezer',
    password: 'MyPassword',
  };
  const noLastname = {
    email: 'adex002@gmail.com',
    firstname: 'Adeoye',
    password: 'MyPassword',
  };
  const noPassword = {
    email: 'adex002@gmail.com',
    firstname: 'Adeoye',
    lastname: 'Ebenezer',
  };
  const noAdminStatus = {
    email: 'adex002@gmail.com',
    firstname: 'Adeoye',
    lastname: 'Ebenezer',
    password: 'password',
  };
  it('should respond with error message "Enter a valid email address"', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(noEmail)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid email address');
        done();
      });
  });
  it('should respond with error "Enter a valid password! password must be greater than 6 characters."', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(noPassword)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid password! password must be greater than 6 characters.');
        done();
      });
  });
  it('should respond with error "Enter a valid Firstname! Firstname must be 2 or more characters."', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(noFirstname)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid Firstname! Firstname must be 2 or more characters.');
        done();
      });
  });
  it('should respond with error "Enter a valid Lastname! Lastname must be 2 or more characters."', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(noLastname)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid Lastname! Lastname must be 2 or more characters.');
        done();
      });
  });
  it('should respond with error "Enter a valid admin status. isAdmin should be either true or false."', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(noAdminStatus)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid admin status. isAdmin should be either true or false.');
        done();
      });
  });
});
describe('Tests to login a User', () => {
  const userObject = {
    email: 'adex001@gmail.com',
    password: 'password',
  };
  const noEmail = {
    password: 'MyPassword',
  };
  const invalidEmail = {
    email: 'invalid@invalid.com',
    password: 'password',
  };
  const invalidPassword = {
    email: 'adex001@gmail.com',
    password: 'invalid-password',
  };
  const noPassword = {
    email: 'adex001@gmail.com',
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
  it('should not login a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(invalidEmail)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('invalid username or password');
        done();
      });
  });
  it('should not login a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(invalidPassword)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('invalid username or password');
        done();
      });
  });
  it('should respond with: "Enter a valid email address" ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(noEmail)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid email address');
        done();
      });
  });
  it('should respond with: "Enter a valid email address" ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(noPassword)
      .end((err, response) => {
        response.body.status.should.eql(400);
        response.body.error.should.be.eql('Enter a valid password! password must be greater than 6 characters.');
        done();
      });
  });
});
