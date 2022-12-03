import express from 'express';
import configViewEngine from './configs/viewEngine';
import initDBConnect from '../database';
import {renderEditTask, editTask} from './controllers/updateTask'
import deleteTask from './controllers/deleteTask'
import {createTask, Render} from './controllers/createTask';
import TodoListTask from "./models/TodoListTask";
import {upTask, downTask} from './controllers/swapTask' 
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT;
configViewEngine(app);
initDBConnect();

//Render
app.get("/", (req, res) => {
   Render(req, res)});

//Create
app.post('/',async (req, res) => {
    var pos =  (await TodoListTask.find().sort({"position":-1}).limit(1)).map((u) => {
        return u.position;
    })
    pos = 1+ parseInt(pos);
    createTask(req, res,pos || 1);
});


//Edit
app
.route("/edit/:id")
.get((req, res) => {
    renderEditTask(req, res);
})
.post((req, res) => {
    const id = req.params.id;
    editTask(req, res, id);
})

//Delete
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    deleteTask(req, res, id);
})


//UpTask
app.route("/up/:id").get((req, res) => {
    const id = req.params.id;
    upTask(req, res, id);
})

//DownTask
app.route("/down/:id").get((req, res) => {
    const id = req.params.id;
    downTask(req, res, id);
})

//Listen
app.listen(3000, () => console.log("Server running in port 3000"));