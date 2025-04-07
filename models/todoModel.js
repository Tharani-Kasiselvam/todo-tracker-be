const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        todo_title : {
            type : String,
            require : true,
            trim : true
        },
        todo_list : {
            type : Array,
            require : true,
            trim : true
        },
        target_date : {
            type : Date,
            require : true
        },
        todo_status : {
            type : String,
            default : "Not Completed"
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {        
        versionKey : false
    }
)

module.exports = mongoose.model('Todo',todoSchema,'todos')