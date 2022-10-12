import mongoose from 'mongoose'

var Schema = mongoose.Schema

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
})

export default mongoose.model('UserModel', UserSchema)