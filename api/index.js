import express, { Router } from "express";
import cors from "cors";

import {handleRegister, handleLogin, handleLogout, refreshAccessToken } from "./controllers/user-controller.js"
import {getModules, createModule, deleteModule, updateModule} from './controllers/module-controller.js'
import { authenticateToken, authorizeAdmin } from "./middleware/auth-middleware.js";
import { checkCache } from "./middleware/module-middleware.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Hello World from OTOT-B");
});

app.post("/register", (req, res) => handleRegister(req, res))

app.post("/login", (req, res) => handleLogin(req, res))

app.delete("/logout", (req, res) => handleLogout(req, res))

app.post("/token", (req, res) => refreshAccessToken(req, res))

app.get("/module", [authenticateToken, checkCache], (req, res) => getModules(req, res));

app.post("/module", [authenticateToken, authorizeAdmin], (req, res) => createModule(req, res))

app.delete("/module/:moduleCode", [authenticateToken, authorizeAdmin], (req, res) => deleteModule(req, res))

app.put("/module", [authenticateToken, authorizeAdmin], (req, res) => updateModule(req ,res))

app.listen(8000);
