const todoSchema = require('../models/todoModel')
const userSchema = require('../models/userModel')

const todoController = {
    createTodo : async (req,res)=>{
        const {todo_title, todo_list, target_date} = req.body
        console.log(target_date)

        if(!todo_title || !todo_list || !target_date)
            return res.status(400).json({message:"Kindly provide values for all the fields"})

        //manually created ## It has to captured from the frontend cookie info
        const id = "67f3258715234418a0fe8649"

        try {

            const userData = await userSchema.findById(id)

            if(!userData)
                return res.status(400).json({message:"Invalid User"})

            const todo_data = new todoSchema({
                todo_title,
                todo_list,
                target_date,
                user : userData
            })
            console.log("##fulldata##",todo_data)
            
            await todo_data.save()
            res.status(200).json({message:"Todo data stored successfully", todo_data})
        } catch (error) {
            return res.status(401).json({message:"Unable to save Todo data"})
        }
    }
}

module.exports = todoController