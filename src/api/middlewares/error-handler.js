const { INTERNAL_SERVER_ERROR} = require('../shared/constants.js');
const errorHandler = (err, req, res) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    let errMsg = err.message || INTERNAL_SERVER_ERROR;

    res.status(errStatus).json({
        error: errMsg
    })
}

module.exports = {
    errorHandler
};
