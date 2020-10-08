import { ItemRepo } from '../ItemRepo';
jest.mock('../../db/connection');
import { db } from '../../db/connection';
const item = new ItemRepo(db);


test('add: returns insertion id', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            insertId: 1
        }}
    ));
    const result = await item.add({});
    expect(result).toEqual(1);

});

test('getSellable: returns array of results', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]}
    ));
    const result = await item.getSellable({});
    expect(result).toEqual([{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}]);

});

test('getById: returns singel object', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]}
    ));
    const result = await item.getById({});
    expect(result).toEqual({"id": 1});

});

test('update: missing userId returns error "missingUserId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
      const result = await item.update({});
    } catch(err) {
      expect(err).toStrictEqual( Error("missingUserId") );
    }

});

test('update: invalid itemId returns error "invalidItemId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            changedRows: 0
        }}
    ));
    try {
      const result = await item.update({userid: 1, itemid: 1});
    } catch(err) {
      expect(err).toStrictEqual( Error("invalidItemId") );
    }

});

test('update: returns number of changed rows', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            changedRows: 1
        }}
    ));
    const result = await item.update({userid: 1, itemid: 1});
    expect(result).toEqual(1);

});