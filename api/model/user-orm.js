import {createUser, findUser} from './repository.js'

export async function ormFindUser(username) {
    try {
        const existingUser = await findUser(username)
        return existingUser
    } catch (err) {
        console.log(err)
    }
}

export async function ormCreateUser(username, hashed_pw) {
    try {
        const newUser = await createUser(username, hashed_pw)
        newUser.save()
        return newUser
    } catch (err) {
        console.log(err)
    }
}