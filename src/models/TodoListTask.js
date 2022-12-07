
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
    create_at: {
        type: String,
        required: true
    },
    end_at: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.model('TodoListTask',todoTaskSchema);