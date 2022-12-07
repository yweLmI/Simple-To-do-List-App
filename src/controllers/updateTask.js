import TodoListTask from "../models/TodoListTask";

const renderEditTask = async (req, res, page) => {
    var perPage = 3;
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
    const id = req.params.id;
    TodoListTask.find({}).sort({position:-1}).skip(perPage*parseInt(page) -perPage).limit(perPage).exec( (err, tasks) => {
        // console.log(tasks);
         res.render("editTask.ejs", { todoTasks: tasks,idTask: id, curIndex:perPage*(parseInt(page) - 1) ,totalLength, maxPos: maxpos, minPos: minpos,type:1, current:page, pages: Math.ceil(totalLength / perPage) });
         });
};


const editTask = async (req, res, id, page) => {
    TodoListTask.findByIdAndUpdate(id, { 
        content: req.body.content,
        create_at: req.body.create_at,
        end_at: req.body.end_at
     }, err => {
    if (err) return res.send(500, err);
    res.redirect("/")+page;
})
    //console.log(req.body);
};
module.exports = {
     renderEditTask, editTask
}