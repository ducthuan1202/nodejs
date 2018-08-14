class Response {

    constructor() {
        this.MSG = {
            valid: {
                code: 200, text: 'Valid'
            },
            invalid: {
                code: 404, text: 'Invalid'
            },
            noPermission: {
                code: 403, text: 'No Permission'
            },
        }
        this.STATUS = {
            success: 'Success',
            error: 'Error'
        }
    }

    returnData(message, status, data = []) {
        return {
            program: "Node JS",
            version: "1.0.0",
            release: 12,
            datetime: Date.now(),
            timestamp: (new Date()).toJSON(),
            status: status,
            code: message.code,
            message: message.text,
            data: data
        };
    }

    error(data) {
        return this.returnData(this.MSG.invalid, this.STATUS.error, data);
    }

    empty(data) {
        return this.returnData(this.MSG.valid, this.STATUS.success, data);
    }

    success(data) {
        return this.returnData(this.MSG.valid, this.STATUS.success, data);
    }

    noPermission(data) {
        return this.returnData(this.MSG.noPermission, this.STATUS.error, data);
    }
}

module.exports = Response;
