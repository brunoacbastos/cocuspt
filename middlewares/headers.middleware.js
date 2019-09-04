'use strict';

module.exports = () => {
    return function (req, res, next) {
        switch (req.headers.accept) {
            case 'application/json':
                next();
                break;
            case 'application/xml':
                res.status(406).send({
                    "status": 406,
                    "message": "Not Acceptable"
                });
                break;
            default:
                return res.status(400).send({
                    "status": 400,
                    "message": "Bad Request"
                });
        }

    };
};