
import TodoListTask from "../models/TodoListTask";

//handleUpEvent
const upTask = async (req, res, id, page) => {
    TodoListTask.findById(id, (err, result) => {
        var nextPos = parseInt(result.position) +1;
        TodoListTask.findOneAndUpdate({position: parseInt(result.position)+1},{position: parseInt(result.position)},(err, prevDoc) => {
            TodoListTask.findByIdAndUpdate(id, { position: nextPos }, err => {
                if (err) return res.send(500, err);
                res.redirect("/"+page);
                });
        })
})
};

//handleDownEvent
const downTask = async (req, res, id, page) => {
    TodoListTask.findById(id, (err, result) => {
        var nextPos = parseInt(result.position) - 1;
        TodoListTask.findOneAndUpdate({position: parseInt(result.position)-1},{position: parseInt(result.position)},(err, prevDoc) => {
            TodoListTask.findByIdAndUpdate(id, { position: nextPos }, err => {
                if (err) return res.send(500, err);
                res.redirect("/"+page);
                });
        })
})
};

module.exports = {upTask, downTask};