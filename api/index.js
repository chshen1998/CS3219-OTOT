import express, { Router } from "express";
import cors from "cors";

import {getModules, createModule, deleteModule, updateModule} from './controllers/module-controller.js'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Hello World from OTOT-B");
});

app.get("/module", (req, res) => getModules(req, res));

app.post("/module", (req, res) => createModule(req, res))

app.delete("/module/:moduleCode", (req, res) => deleteModule(req, res))

app.put("/module", (req, res) => updateModule(req ,res))

app.listen(8000);

export default app
