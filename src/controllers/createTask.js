import TodoListTask from "../models/TodoListTask";

const createTask = async (req, res, position, page) => {
    const todoTask = new TodoListTask({
        content: req.body.content,
        create_at: req.body.create_at,
        end_at: req.body.end_at,
        position: position
    });
    try {
        await todoTask.save();
        Render(req, res, 1, page);
    } catch(err) {
        Render(req, res,1, page);
    }
}


const Render = async (req, res, type, page) => {
    let perPage =3;
    let totalLength = (await TodoListTask.find({})).length;
    
    var maxpos = (await TodoListTask.find().sort({"position":-1}).limit(1)).map((u) => {
        return u.position;
    });
    var minpos = (await TodoListTask.find().sort({"position":1}).limit(1)).map((u) => {
        return u.position;
    });
    if (maxpos==null) {
        maxpos = 0;
    }
    if (minpos==null) {
        minpos = 0;
    }
    if(type==1){
        TodoListTask.find({}).sort({position:-1}).skip(perPage*parseInt(page) -perPage).limit(perPage).exec( (err, tasks) => {
           // console.log(tasks);
            res.render("index.ejs", { todoTasks: tasks, curIndex:perPage*(parseInt(page) - 1) ,totalLength, maxPos: maxpos, minPos: minpos, type, current:page, pages: Math.ceil(totalLength / perPage) });
            });
    }
    if(type==2){
        TodoListTask.find({}).sort({create_at:1}).skip(perPage*parseInt(page) -perPage).limit(perPage).exec( (err, tasks) => {
            // console.log(tasks);
             res.render("index.ejs", { todoTasks: tasks, curIndex:perPage*(parseInt(page) - 1) ,totalLength, maxPos: maxpos, minPos: minpos, type, current:page, pages: Math.ceil(totalLength / perPage) });
             });
            } 
    if(type==3){
        TodoListTask.find({}).sort({end_at:1}).skip(perPage*parseInt(page) -perPage).limit(perPage).exec( (err, tasks) => {
            // console.log(tasks);
             res.render("index.ejs", { todoTasks: tasks, curIndex:perPage*(parseInt(page) - 1) ,totalLength, maxPos: maxpos, minPos: minpos, type, current:page, pages: Math.ceil(totalLength / perPage) });
             });
    }
    
    
}

module.exports = {createTask, Render};