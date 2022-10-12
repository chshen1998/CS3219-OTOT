import { findFromCache } from "../model/redis.js";

export async function checkCache(req, res, next) {
    const data = await findFromCache("modules")
    if (data) {
        console.log("get from cache")
        res.status(200).send(data)
        return
    }
    next()
}