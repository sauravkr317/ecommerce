class CustomerrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static AlreadyExists(message = 'This email is already taken.') {
        return new CustomerrorHandler(409, message);
    }
    static wrongCredentials(message = 'Email or Password is incorrect') {
        return new CustomerrorHandler(401, message);
    }
    static notFound(message = '404 not found') {
        return new CustomerrorHandler(404, message);
    }
    static unAuthorized(message = 'unAuthorize Access') {
        return new CustomerrorHandler(401, message);
    }
}

export default CustomerrorHandler;