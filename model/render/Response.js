/**
 * status: [success, error]
code: [200, 404]
message: [valid, invalid, No permission]
 */
class Response {

    constructor() {
        this.MSG_VALID = { code: 200, text: 'Valid' };
        this.MSG_INVALID = { code: 200, text: 'Invalid' };
        this.MSG_NO_PERMISSION = { code: 200, text: 'No Permission' };

        this.STATUS_SUCCESS = 'Success';
        this.STATUS_ERROR = 'Error';
    }

    returnData(message, status, data) {
        const datetime = new Date();
        const res = {
            program: "Node JS",
            version: "1.0.0",
            release: 12,
            datetime: Date.now(),
            timestamp: datetime.toJSON(),
            status: status,
            code: message.code,
            message: message.text,
            data: data
        };

        return res;
    }

    error(data = []) {
        return this.returnData(this.MSG_INVALID, this.STATUS_ERROR, data);
    }

    empty(data = []) {
        return this.returnData(this.MSG_INVALID, this.STATUS_ERROR, data);
    }

    success(data = []) {
        return this.returnData(this.MSG_VALID, this.STATUS_SUCCESS, data);
    }

    noPermission(data = []) {
        return this.returnData(this.MSG_NO_PERMISSION, this.STATUS_ERROR, data);
    }
}

module.exports = Response;
