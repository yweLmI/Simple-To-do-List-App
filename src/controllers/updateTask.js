import TodoListTask from "../models/TodoListTask";

const renderEditTask = async (req, res) => {
    const id = req.params.id;
    TodoListTask.find({}, (err, tasks) => {
    res.render("editTask.ejs", { todoTasks: tasks, idTask: id });
})};


const editTask = async (req, res, id) => {
    TodoListTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
})};
module.exports = {
     renderEditTask, editTask
}