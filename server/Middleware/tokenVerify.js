const jwt = require('jsonwebtoken')
exports.tokenVerify = (req, res, next) => {
    const headers = req.headers
    const bearerToken = headers["authorization"]
    if (!bearerToken) return res.status(401).send('unauthorized')
    const token = bearerToken.split(' ')[1]
    try {
        const credentials = jwt.verify(token, process.env.JWT_SECRET)
        req.id = credentials.id
        console.log(req.id)
    } catch (error) {
        console.log(error, 'errrrrrrrrrrrr')
        if (error) {
            return res.send({
                success: false,
                messege: error.messege

            })
        }
    }
    next()
}