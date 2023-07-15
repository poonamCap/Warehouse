const errorHandler = (err, req, res) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong.';
    res.status(errStatus).json({
        error: errMsg
    })
}

module.exports = {
    errorHandler
};
