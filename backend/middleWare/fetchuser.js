const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mynewpassword'

const fetchuser = (req, res, next) => {
    // auth-token
    const token = req.header('Authorization')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    } 
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()

    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
}


module.exports = fetchuser;