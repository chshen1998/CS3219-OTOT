import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ormFindUser, ormCreateUser } from "../model/user-orm.js";
import { saveTokenToCache, findTokenFromCache, removeFromCache } from '../model/redis.js';

export async function refreshAccessToken(req, res) {
    const refreshToken = req.body.refresh_token
    if (!refreshToken) {
        res.status(400).send("Refresh token required")
        return
    }

    const value = await findTokenFromCache(refreshToken)
    if (!value) {
        res.status(400).send("Invalid refresh token")
        return 
    }
    await removeFromCache(refreshToken)

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(400).send("Invalid refresh token")
            return null
        }
        return user
    })

    if (user) {
        const accessToken = await generateAccessToken(user.name, user.role)
        const refreshToken = await generateRefreshToken(user.name, user.role)
        res.status(200).send({
            access_token:accessToken,
            refresh_token:refreshToken     
        }) 
    }
}

export async function handleRegister(req, res) {
    const {username, password} = req.body
    if (!username) {
        res.status(400).send("Username required for account registration")
        return
    }
    if (!password) {
        res.status(400).send("Password required for account registration")
        return
    }

    const existingUser = await ormFindUser(username)
    if (existingUser) {
        res.status(400).send("Account with this username already exists")
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashed_pw = await bcrypt.hash(password, salt)
    const newUser = await ormCreateUser(username, hashed_pw)

    const accessToken = await generateAccessToken(username, newUser.role)
    const refreshToken = await generateRefreshToken(username, newUser.role)
    await saveTokenToCache(refreshToken)

    res.status(200).send({
        access_token: accessToken,
        refresh_token: refreshToken
    })
}

export async function handleLogin(req, res) {
    const {username, password} = req.body
    if (!username) {
        res.status(400).send("Username required")
        return
    }
    if (!password) {
        res.status(400).send("Password required")
        return
    }

    const exisitingUser = await ormFindUser(username)
    if (!exisitingUser) {
        res.status(400).send("Invalid login credentials")
        return
    }

    const isMatch = await bcrypt.compare(password, exisitingUser.hashed_password)
    if (!isMatch) {
        res.status(400).send("Invalid login credentials wrong pw")
        return
    }

    const accessToken = await generateAccessToken(username, exisitingUser.role)
    const refreshToken = await generateRefreshToken(username, exisitingUser.role)
    await saveTokenToCache(refreshToken)
    
    res.status(200).send({
        access_token: accessToken,
        refresh_token: refreshToken
    })
}

export async function handleLogout(req, res) {
    const refreshToken = req.body.refresh_token
    if (refreshToken) {
        await removeFromCache(refreshToken)
    }
    res.status(200).send("Successfully logged out")
}

async function generateAccessToken(username, role) {
    return jwt.sign({name: username, role: role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

async function generateRefreshToken(username, role) {
    return jwt.sign({name:username, role: role}, process.env.REFRESH_TOKEN_SECRET)
}