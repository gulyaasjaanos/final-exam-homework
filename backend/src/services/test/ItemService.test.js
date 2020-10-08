import { itemService as item } from '../../dependencies';
jest.mock('../../db/connection');
import { db } from '../../db/connection';


test('add: missing/invalid data returns error "missing.../invalid..."', async () => {
    
    db.query.mockImplementation( () => ( 4 ));
    try {
      const result = await item.add({

        });
    } catch(err) {
      expect(err).toStrictEqual( Error("missingUserId") );
    }

    try {
        const result = await item.add({
            userid: 1,
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("missingItemName") );
    }

    try {
        const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("missingItemDescription") );
    }

    try {
        const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
            description: 'item description',
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("missingItemUrl") );
    }

    try {
        const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
            description: 'item description',
            url: 'someurl', 
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("missingItemPrice") );
    }

    try {
        const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
            description: 'item description',
            url: 'someurl', 
            price: 'five'
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidItemPrice") );
    }

    try {
        const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
            description: 'item description',
            url: 'someurl', 
            price: 5
          });
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidItemUrl") );
    }

});

test('add: returns item', async () => {
    
    db.query.mockImplementation( () => (
        { results: {
            insertId: 4
        }}
    ));
    const result = await item.add({
            userid: 1,
            itemname: 'itemtosale', 
            description: 'item description',
            url: 'www.someurl.com', 
            price: 5
          });
    expect(result).toStrictEqual({
        "buyerid": null,
        "description": "item description",
        "id": 4,
        "name": "itemtosale",
        "ownerid": 1,
        "price": 5,
        "status": "sellable",
        "url": "www.someurl.com"
    });

});

test('buy: returns item', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [{
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5,
            ownerid: 1,
            ownername: "one",
            buyerid: 2,
            buyername: "two",
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
    const result = await item.buy({ userid: 2, itemid: 1 });
    expect(result).toStrictEqual({
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5,
        buyername: "two",
    });

});

test('buy: not enough dollar returns error "invalidDollar"', async () => {
    
    db.query.mockImplementationOnce( () => (
        { results: [{
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5000,
            ownerid: 1,
            ownername: "one",
            buyerid: 2,
            buyername: "two",
            status: "sellable"
        }]}
    ));
    db.query.mockImplementation( () => (
        { results: [{
            username: "two",
            dollar: 1000
        }]}
    ));
    try {
        const result = await item.buy({ userid: 2, itemid: 1 });
        expect(result).toStrictEqual({
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5,
            buyername: "two",
        });
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidDollar") );
    }

});

test('buy: already sold item returns error "invalidItemStatus"', async () => {
    
    db.query.mockImplementation( () => (
        { results: [{
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5000,
            ownerid: 1,
            ownername: "one",
            buyerid: 2,
            buyername: "two",
            status: "sold"
        }]}
    ));
    try {
        const result = await item.buy({ userid: 2, itemid: 1 });
        expect(result).toStrictEqual({
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5,
            buyername: "two",
        });
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidItemStatus") );
    }

});

test('buy: already ownd item returns error "invalidItemOwnerId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: [{
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5000,
            ownerid: 2,
            ownername: "one",
            buyerid: 2,
            buyername: "two",
            status: "sellable"
        }]}
    ));
    try {
        const result = await item.buy({ userid: 2, itemid: 1 });
        expect(result).toStrictEqual({
            name: "itemtosale",
            description: "item description",
            url: "www.someurl.com",
            price: 5,
            buyername: "two",
        });
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidItemOwnerId") );
    }

});

test('buy: invalid item id returns error "invalidItemId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
        const result = await item.buy({ userid: 2, itemid: 1 });
        expect(result).toStrictEqual({});
    } catch(err) {
        expect(err).toStrictEqual( Error("invalidItemId") );
    }

});

test('buy: missing item id returns error "missingItemId"', async () => {
    
    db.query.mockImplementation( () => (
        { results: []}
    ));
    try {
        const result = await item.buy({ userid: 2});
        expect(result).toStrictEqual({});
    } catch(err) {
        expect(err).toStrictEqual( Error("missingItemId") );
    }

});

test('list: returns array', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            {
                name: "itemtosale",
                description: "item description",
                url: "www.someurl.com",
                price: 5000,
                ownerid: 2,
                ownername: "one",
                buyerid: 2,
                buyername: "two",
                status: "sellable"
            },
            {
                name: "itemtosale",
                description: "item description",
                url: "www.someurl.com",
                price: 5000,
                ownerid: 2,
                ownername: "one",
                buyerid: 2,
                buyername: "two",
                status: "sellable"
            }
        ]}
    ));
    const result = await item.list();
    expect(result).toStrictEqual([{
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000,
        ownerid: 2,
        ownername: "one",
        buyerid: 2,
        buyername: "two",
        status: "sellable"
    },
    {
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000,
        ownerid: 2,
        ownername: "one",
        buyerid: 2,
        buyername: "two",
        status: "sellable"
    }]);

});


test('get: sellable returns object', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            {
                name: "itemtosale",
                description: "item description",
                url: "www.someurl.com",
                price: 5000,
                ownerid: 2,
                ownername: "one",
                buyerid: 2,
                buyername: "two",
                status: "sellable"
            }
        ]}
    ));
    const result = await item.get({ itemid: 1 });
    expect(result).toStrictEqual({
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000,
        ownername: "one"
    });

});

test('get: sold returns object', async () => {
    
    db.query.mockImplementation( () => (
        { results: [
            {
                name: "itemtosale",
                description: "item description",
                url: "www.someurl.com",
                price: 5000,
                ownerid: 2,
                ownername: "one",
                buyername: "two",
                buyerid: 2,
                status: "sold"
            }
        ]}
    ));
    const result = await item.get({ itemid: 1 });
    expect(result).toStrictEqual({
        name: "itemtosale",
        description: "item description",
        url: "www.someurl.com",
        price: 5000,
        buyername: "two"
    });

});
