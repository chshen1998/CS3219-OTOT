import redis from "redis"

// Set up redis client
let redisClient = redis.createClient()
redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

export async function saveTokenToCache(key) {
    try {
        await redisClient.set(key, 1)
    } catch (err) {
        console.log(err)
    }
}

export async function saveToCache(key, value) {
    try {
        await redisClient.set(key, JSON.stringify(value))
    } catch (err) {
        console.log(err)
    }
}

export async function findTokenFromCache(key) {
    try {
        return await redisClient.get(key)
    } catch (err) {
        console.log(err)
    }
}

export async function findFromCache(key) {
    try {
        const data = await redisClient.get(key)
        return JSON.parse(data)
    } catch (err) {
        console.log(err)
    }
}

export async function removeFromCache(key) {
    try {
        await redisClient.del(key)
    } catch (err) {
        console.log(err)
    }
}