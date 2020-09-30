export class ErrorHandler {

    constructor() {

        this.errors = {
            defaultCode : { status : 400, message : null},
            invalidUsername : { status : 401, message: 'Invalid username.'},
            invalidPassword : { status : 401, message: 'Invalid password.'},
            missingItemName : { status : 400, message: 'Item name is missing.'},
            missingItemDescription : { status : 400, message: 'Item description is required.'},
            invalidItemUrl : { status : 400, message: 'This is not a valid URL.'},
            invalidItemPrice : { status : 400, message: 'Price must be a positive whole number.'},
            missingUserId : { status : 400, message: 'Userid is required.'},
            invalidUserId : { status : 404, message: 'Invalid userid.'},
            missingDollar : { status : 400, message: 'Dollar amount is required.'},
            invalidItemOwnerId : { status : 403, message: 'Item is already owned.'},
            invalidDollar : { status : 402, message: 'Not enough dollars.'},
            invalidItemStatus : { status : 403, message: 'Item is already sold.'},
            notAuthenticated : { status : 401, message: 'Login required.'},
            invalidItemId : { status : 404, message: 'Item not found.'},
            missingItemId : { status : 400, message: 'Itemid is required.'},
        };
        this.post = this.post.bind(this);

    };

    async post(err, res) {

        const errorCode = err.message;
        let {status, message} =  this.errors[errorCode] || this.errors.defaultCode;
        res.status(status).send({error: message || err.message});  

    };

};
