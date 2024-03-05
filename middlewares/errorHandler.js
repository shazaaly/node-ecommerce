const notFound = (req, res, next) => {
    const notFoundError = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(notFoundError)

};

const ErrHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err?.message,
        stack : err?.stack
   })


}

module.exports = { ErrHandler, notFound}