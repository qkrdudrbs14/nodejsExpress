const jwt = require('jsonwebtoken')
const secretKey = require('../config/secretkey').secretKey

// https://im-developer.tistory.com/167 참고
const verifyToken = (req, res,next) => {
    try {
        const {token} = req.cookies;

        const decoded = jwt.verify(token, secretKey)

        if(decoded) {
            // res.locals.userId = decoded.user_id;
            next()
        } else {
            res.status(401).json({error: 'unauthorized'})
        }
    } catch(err) {
        console.log(err.message)
        res.status(401).json({error: 'token expired'})
    }
}

exports.verifyToken = verifyToken