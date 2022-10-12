import { ormGetModules, ormCreateModule, ormFindModule, ormDeleteModule, ormUpdateModule } from "../model/module-orm.js";
// import { saveToCache, removeFromCache } from "../model/redis.js";

export async function getModules(req, res) {
    console.log("get from database")
    const modules = await ormGetModules()
    // await saveToCache("modules", modules)
    res.status(200).send(modules) 
}

export async function createModule(req, res) {
    const moduleCode = req.body.moduleCode
    if (!moduleCode) {
        res.status(400).send("Missing module code")
        return
    }

    const moduleTitle = req.body.moduleTitle
    if (!moduleTitle) {
        res.status(400).send("Missing module title")
        return
    }

    const module = await ormFindModule(moduleCode)
    if (module) {
        res.status(400).send("Module " + moduleCode + " already exists")
        return
    }

    await ormCreateModule(moduleCode, moduleTitle)
    // await removeFromCache("modules")
    res.status(200).send("Module created")
}

export async function deleteModule(req, res) {
    const moduleCode = req.params.moduleCode
    if (!moduleCode) {
        res.status(400).send("Missing module code")
        return
    }

    const module = await ormFindModule(moduleCode)
    if (!module) {
        res.status(400).send("Module " + moduleCode + " does not exist")
        return
    }

    ormDeleteModule(moduleCode)
    // await removeFromCache("modules")
    res.status(200).send("Module deleted")
}

export async function updateModule(req, res) {
    const moduleCode = req.body.moduleCode
    if (!moduleCode) {
        res.status(400).send("Missing module code")
        return
    }

    const moduleTitle = req.body.moduleTitle
    if (!moduleTitle) {
        res.status(400).send("Missing module title")
        return
    }
    
    const module = await ormFindModule(moduleCode)
    if (!module) {
        res.status(400).send("Module " + moduleCode + " does not exist")
        return
    }

    await ormUpdateModule(moduleCode, moduleTitle)
    // await removeFromCache("modules")
    res.status(200).send("Module updated")
}
