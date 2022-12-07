import express from 'express';
import configViewEngine from './configs/viewEngine';
import initDBConnect from './configs/database';
import {renderEditTask, editTask} from './controllers/updateTask'
import deleteTask from './controllers/deleteTask'
import {createTask, Render} from './controllers/createTask';
import isFinish from './controllers/finish';
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
app.get("/:page", (req, res) => {
    let page = req.params.page || 1;
   Render(req, res,1,page)});

//Create
app.post('/:page',async (req, res) => {
    const page = req.params.page || 1;
    var pos =  (await TodoListTask.find().sort({"position":-1}).limit(1)).map((u) => {
        return u.position;
    })
    pos = 1+ parseInt(pos);
    createTask(req, res,pos || 1, page);
    // console.log(req.body);
});


//Edit
app
.route("/edit/:id/:page")
.get((req, res) => {
    const page = req.params.page || 1;
    renderEditTask(req, res,page);
})
.post((req, res) => {
    const id = req.params.id;
    const page = req.params.page || 1;
    editTask(req, res, id, page);
})

//Delete
app.route("/remove/:id/:page").get((req, res) => {
    const id = req.params.id;
    const page = req.params.page || 1;
    deleteTask(req, res, id, page);
})


//UpTask
app.route("/up/:id/:page").get((req, res) => {
    const id = req.params.id;
    const page = req.params.page || 1;
    upTask(req, res, id, page);
})

//DownTask
app.route("/down/:id/:page").get((req, res) => {
    const page = req.params.page || 1;
    const id = req.params.id;
    downTask(req, res, id, page);
})
app.get("/sortbydatestart/:page",(req, res) => {
    const page = req.params.page || 1;
    Render(req, res, 2,page);
    //console.log(req.body)
    //res.redirect("/")
})
app.get("/sortbydateend/:page",(req, res) => {
    const page = req.params.page || 1;
    Render(req, res, 3,page);
    //console.log(req.body)
    //res.redirect("/")
})
app.get("/finish/:id/:page",(req, res) => {
    const page = req.params.page || 1;
    const id = req.params.id;
    isFinish(req, res, id,page);
    //console.log(req.body)
    //res.redirect("/")
})
//Listen
app.listen(port, () => console.log("Server running in port 3000"));