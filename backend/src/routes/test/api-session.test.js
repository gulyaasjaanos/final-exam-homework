import request from 'supertest';
import app from '../../app';

jest.mock('../../db/connection');
import { db } from '../../db/connection';
db.query.mockImplementation( () => (
  { results: [

  ] }
));

test('post: missing or invalid username returns error "Invalid username."', done => {
  request(app)
    .post('/api/session')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Invalid username.");
      return done();
    });
});

test('post: missing or invalid password returns error "Invalid password."', done => {
  db.query.mockImplementationOnce( () => (
    { results: [{ userid : 1 }] }
  ));
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .post('/api/session')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Invalid password.");
      return done();
    });
});

test('valid username and password returns token', done => {
  db.query.mockImplementationOnce( () => (
    { results: [{ userid : 1 }] }
  ));
  db.query.mockImplementation( () => (
    { results: [{ userid : 1 }] }
  ));
  request(app)
    .post('/api/session')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      let tokenPart = data.body.token;
      tokenPart = tokenPart.split('');
      tokenPart.length = 20;
      tokenPart = tokenPart.join('');
      expect(tokenPart).toEqual('eyJhbGciOiJIUzI1NiIs');
      return done();
    });
});
