
const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    position: {
        type: Number,
        default: 1
       
    },
})
module.exports = mongoose.model('TodoListTask',todoTaskSchema);