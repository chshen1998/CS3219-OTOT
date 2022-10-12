import mongoose from 'mongoose'

var Schema = mongoose.Schema

let ModuleSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    }
})

export default mongoose.model('ModuleModel', ModuleSchema)