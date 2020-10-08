import { sessionService as session } from '../../dependencies';
jest.mock('../../db/connection');
import { db } from '../../db/connection';


test('login: missing/invalid username returns error "invalidUsername"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await session.login({});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidUsername") );
    }

});

test('login: missing/invalid username returns error "invalidPassword"', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [{userid: 1}]}
    ));
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await session.login({});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidPassword") );
    }

});

test('login: returns token', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [{userid: 1}]}
    ));
    db.query.mockImplementation( () => (
        { results: [{userid: 1}]}
    ));
    let result = await session.login({});
    result = result.split('');
    result.length = 30;
    result = result.join('');
    expect(result).toStrictEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6Ik");

});

test('verifyToken: missing/invalid token returns error "notAuthenticated"', async () => {
    
    try {
      const result = await session.verifyToken({});
    } catch(err) {
      expect(err).toStrictEqual( Error("notAuthenticated") );
    }

});

test('verifyToken: returns userid', async () => {
    
    const result = await session.verifyToken({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlcmlkIjoxfSwiaWF0IjoxNjAyMTYyNzcwfQ.HpUJ7PH2PLtzhJcbPf953tSJ65xL8e8uKMhk-HSXgBY"});
    expect(result).toStrictEqual({userid: 1});

});

test('userData: returns user data', async () => {
    
    db.query.mockImplementation( () => (
        { results: [{
            id: 1,
            username: "teszt",
            password: "hiddenpassword",
            dollar: 440
        }]}
    ));
    const result = await session.userData({});
    expect(result).toStrictEqual({
        username: "teszt",
        dollar: 440
    });

});