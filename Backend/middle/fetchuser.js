const jwt = require('jsonwebtoken')

const JWT_SECRET = 'mymeds@com/m/n/s-2023'

const fetchuser = (req, resp, next) => {
    const token = req.header('auth-token')

    if(!token){
        resp.status(401).send({error : "please authenticate using a valid token"})

        try {
            const data = jwt.verify(token,JWT_SECRET)
            req.users =data.users
            next()
        } catch (error) {
            res.status(401).send({ error: "please authenticate using a valid token" })
        }
    }
}

module.exports = fetchuser