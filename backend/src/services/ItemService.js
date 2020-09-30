export class ItemService {

    constructor( userRepo, itemRepo ) {
        this.user = userRepo;
        this.item = itemRepo;
        this.add = this.add.bind(this);
        this.buy = this.buy.bind(this);
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
    };

    async checkDollar({userid, price}) {
        const {dollar, username} = await this.user.getById({ userid });
        return {
          canBuy : (dollar >= price),
          dollar,
          username
        };
    };

    validateParams({ userid, itemname, description, url, price }) {

        if (!userid) throw new Error('missingUserId');
        if (!itemname) throw new Error('missingItemName');
        if (!description) throw new Error('missingItemDescription');
        if (!url) throw new Error('missingItemUrl');
        if (price === undefined) throw new Error('missingItemPrice');

        const regexPrice = /^[+]?\d*$/;
        const regexUrl = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        if (!regexPrice.test(price)) throw new Error('invalidItemPrice');
        if (!regexUrl.test(url)) throw new Error('invalidItemUrl');

    };

    async add({ userid, itemname, description, url, price }) {

        this.validateParams({ userid, itemname, description, url, price });
        let item = {
          id : null,
          name : itemname,
          description : description,
          url : url,
          price : price,
          ownerid : userid,
          buyerid : null,
          status : 'sellable'
        };
        item.id = await this.item.add(item);

        return item;

    };

    async buy({ userid, itemid }) {

      if (!userid) throw new Error('missingUserId');
      if (!itemid) throw new Error('missingItemId');

      const item = await this.item.getById(itemid);
      if(!item) throw new Error('invalidItemId');

      const {price, ownerid, status} = item;
      if (ownerid === userid) throw new Error('invalidItemOwnerId');
      if (status !== 'sellable') throw new Error('invalidItemStatus');
      const {canBuy, dollar, username} = await this.checkDollar({userid, price});
      if(!canBuy) throw new Error('invalidDollar');

      this.user.updateDollar({ userid, dollar : dollar-price });
      const ownerDollar = (await this.user.getById({ userid : item.ownerid })).dollar;
      this.user.updateDollar({ userid : item.ownerid, dollar : ownerDollar+price });

      await this.item.update({itemid, userid});

      delete item.status;
      delete item.buyerid;
      delete item.ownerid;
      delete item.ownername;
      item.buyername = username;
      return item;

    };

    async list() {

      const itemList = await this.item.getSellable();
      return itemList; 

    };

    async get({ itemid }) {

      if (!itemid) throw new Error('missingItemId');
      let item = await this.item.getById(itemid);
      if (!item) throw new Error('invalidItemId');

      if (item.status === 'sellable') {
        delete item.buyername;
      } else {
        delete item.ownername;
      }
      delete item.status;
      delete item.buyerid;
      delete item.ownerid;
      
      return item;

    };

};
