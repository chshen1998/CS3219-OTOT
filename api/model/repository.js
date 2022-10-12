import 'dotenv/config'

import ModuleModel from './module-model.js'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createModule(moduleCode, moduleTitle) {
    return new ModuleModel({code:moduleCode, title:moduleTitle})
}

export async function getModules() {
    return ModuleModel.find()
}

export async function findModule(moduleCode) {
    return ModuleModel.findOne({code:moduleCode})
}

export async function deleteModule(moduleCode) {
    return ModuleModel.deleteOne({code:moduleCode})
}

export async function updateModule(moduleCode, moduleTitle) {
    return ModuleModel.findOneAndUpdate({code:moduleCode}, {title:moduleTitle})
}