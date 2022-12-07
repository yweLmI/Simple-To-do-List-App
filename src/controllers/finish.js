import TodoListTask from "../models/TodoListTask";

const isFinish = async (req, res, id, page) => {
    TodoListTask.findByIdAndUpdate(id, { 
        finished: true,
        
     }, err => {
    if (err) return res.send(500, err);
    res.redirect("/" +page);
})
    //console.log(req.body);
};
module.exports = isFinish;