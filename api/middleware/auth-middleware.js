import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.sendStatus(401)
        return
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
        res.sendStatus(401)
        return
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
            console.log(err)
            return
        }
        req.user = user
        next()
    })
}

export async function authorizeAdmin(req, res, next) {
    if (req.user.role != "admin") {
        res.sendStatus(403)
        return
    }
    next()
}