import TodoListTask from "../models/TodoListTask";

const createTask = async (req, res, position) => {
    const todoTask = new TodoListTask({
        content: req.body.content,
        position: position
    });
    try {
        await todoTask.save();
       Render(req, res);
    } catch(err) {
        Render(req, res);
    }
}


const Render = (req, res) => {
    TodoListTask.find({}, (err, tasks) => {
        tasks.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
        res.render("index.ejs", { todoTasks: tasks });
        });
}

module.exports = {createTask, Render};