import { UserRepo } from '../UserRepo';
jest.mock('../../db/connection');
import { db } from '../../db/connection';
const user = new UserRepo(db);


test('getUserId: missing/invalid username returns error "invalidUsername"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await user.getUserId({});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidUsername") );
    }

});

test('getUserId: missing/invalid password returns error "invalidPassword"', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [
            { userid : 1 }
        ]}
    ));
    db.query.mockImplementation( () => (
        { results: [
        ]}
    ));
    try {
      const result = await user.getUserId({});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidPassword") );
    }
    
});

test('getUserId: returns userid', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [
            { userid : 1 }
        ]}
    ));
    db.query.mockImplementation( () => (
        { results: [
            { userid : 1 }
        ]}
    ));
    const result = await user.getUserId({});
    expect(result).toEqual({ userid : 1 });
    
});

test('getById: missing/invalid userId returns error "invalidUserId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await user.getById({});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidUserId") );
    }

});

test('getById: returns userdata', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            { userid : 1, userdata : "userdata"}
        ]}
    ));
    const result = await user.getById({});
    expect(result).toEqual({ userid : 1, userdata : "userdata"});

});

test('updateDollar: missing userId returns error "missingUserId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await user.updateDollar({});
    } catch(err) {
      expect(err).toStrictEqual( Error("missingUserId") );
    }

});

test('updateDollar: missing Dollar amount returns error "missingDollar"', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            changedRows: 0
        }}
    ));
    try {
      const result = await user.updateDollar({userid: 1});
    } catch(err) {
      expect(err).toStrictEqual( Error("missingDollar") );
    }

});

test('updateDollar: invalid userId returns error "invalidUserId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            changedRows: 0
        }}
    ));
    try {
      const result = await user.updateDollar({userid: 1, dollar: 1});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidUserId") );
    }

});

test('updateDollar: returns number of changed rows', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            changedRows: 1
        }}
    ));
    const result = await user.updateDollar({userid: 1, dollar: 1});
    expect(result).toEqual(1);

});
