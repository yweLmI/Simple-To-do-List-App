import TodoListTask from "../models/TodoListTask";
const deleteTask = async (req, res, id,page) => {
    TodoListTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/"+page);
})};

module.exports = deleteTask;
