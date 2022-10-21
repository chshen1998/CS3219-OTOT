import { createModule, getModules, findModule, deleteModule, updateModule } from "./repository.js";

export async function ormCreateModule(moduleCode, moduleTitle) {
    try {
        const newModule = await createModule(moduleCode, moduleTitle)
        newModule.save()
        return newModule        
    } catch (err) {
        console.log(err)
    }
}

export async function ormGetModules() {
    try {
        return await getModules()
    } catch (err) {
        console.log(err)
    }
    
}

export async function ormFindModule(moduleCode) {
    try {
        const module = await findModule(moduleCode)
        return module        
    } catch (err) {
        console.log(err)
    }
}

export async function ormDeleteModule(moduleCode) {
    try {
        await deleteModule(moduleCode)
    } catch (err) {
        console.log(err)
    }
}

export async function ormUpdateModule(moduleCode, moduleTitle) {
    try {
        return await updateModule(moduleCode, moduleTitle)
    } catch (err) {
        console.log(err)
    }
}