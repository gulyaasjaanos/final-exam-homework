import request from 'supertest';
import app from '../../app';

jest.mock('../../db/connection');
import { db } from '../../db/connection';
db.query.mockImplementation( () => (
  { results: [

  ] }
));

test('valid token on /items returns data array', done => {
  db.query.mockImplementation( () => (
    { results: [
        {
            id: 1,
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5000
        }
    ]}
  ));
  request(app)
    .get('/api/items')
    .set('Accept', 'application/json')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlcmlkIjoxfSwiaWF0IjoxNjAyMTYyNzcwfQ.HpUJ7PH2PLtzhJcbPf953tSJ65xL8e8uKMhk-HSXgBY')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toStrictEqual([{
        id: 1,
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000
      }]);
      return done();
    });
});

test('valid token on /items/:id returns data object', done => {
  db.query.mockImplementation( () => (
    { results: [
        {
            id: 1,
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5000
        }
    ]}
  ));
  request(app)
    .get('/api/items/3')
    .set('Accept', 'application/json')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlcmlkIjoxfSwiaWF0IjoxNjAyMTYyNzcwfQ.HpUJ7PH2PLtzhJcbPf953tSJ65xL8e8uKMhk-HSXgBY')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toStrictEqual({
        id: 1,
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000
      });
      return done();
    });
});


test('post: valid token on /items/:id returns bought item', done => {
  db.query.mockImplementationOnce( () => (
    { results: [{
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5,
        ownerid: 2,
        ownername: "two",
        buyerid: null,
        buyername: null,
        status: "sellable"
    }]}
  ));
  db.query.mockImplementationOnce( () => (
      { results: [{
          username: "two",
          dollar: 1000
      }]}
  ));
  db.query.mockImplementationOnce( () => (
      { results: {
          changedRows: 1
      }}
  ));
  db.query.mockImplementationOnce( () => (
      { results: [{
          username: "one",
          dollar: 500
      }]}
  ));
  db.query.mockImplementationOnce( () => (
      { results: {
          changedRows: 1
      }}
  ));
  db.query.mockImplementation( () => (
      { results: {
          changedRows: 1
      }}
  ));
  request(app)
    .post('/api/items/3')
    .set('Accept', 'application/json')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlcmlkIjoxfSwiaWF0IjoxNjAyMTYyNzcwfQ.HpUJ7PH2PLtzhJcbPf953tSJ65xL8e8uKMhk-HSXgBY')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toStrictEqual({
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5,
        buyername: "two",
    });
      return done();
    });
});

test('post: valid token on /items returns item for sale', done => {
  db.query.mockImplementation( () => (
    { results: {
        insertId: 4
    }}
  ));
  request(app)
    .post('/api/items')
    .set('Accept', 'application/json')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlcmlkIjoxfSwiaWF0IjoxNjAyMTYyNzcwfQ.HpUJ7PH2PLtzhJcbPf953tSJ65xL8e8uKMhk-HSXgBY')
    .send({
      "itemname" : "buy it",
      "description" : "very good item",
      "url" : "https://picsum.photos/200",
      "price" : 10
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toStrictEqual({
        "buyerid": null,
        "description": "very good item",
        "id": 4,
        "name": "buy it",
        "ownerid": 1,
        "price": 10,
        "status": "sellable",
        "url": "https://picsum.photos/200",
    });
      return done();
    });
});
