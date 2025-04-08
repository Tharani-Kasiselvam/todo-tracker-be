const todoSchema = require('../models/todoModel')
const userSchema = require('../models/userModel')

const todoController = {
    createTodo: async (req, res) => {
        const { todo_title, todo_list, target_date } = req.body

        if (!todo_title || !todo_list || !target_date)
            return res.status(400).json({ message: "Kindly provide values for all the fields" })

        //manually created ## It has to be captured from the frontend cookie info
        const id = "67f149e115234418a0fe8645"

        try {

            const userData = await userSchema.findById(id)

            if(!userData)
                return res.status(400).json({message:"Invalid User"})

            console.log(userData)


            let curr_date = new Date()

            //Validate Target Date with Current Date
            if (new Date(target_date) < new Date(curr_date))
                return res.status(400).json({ message: "Target Date is a Past date, kindly verify" })

            //Validates Duplication of Todo Title
            const title_data = await todoSchema.find({ todo_title: todo_title })
            const filter_title_data = title_data.filter(t_data => t_data.todo_title == todo_title &&
                new Date(t_data.target_date).toDateString() == new Date(target_date).toDateString())

            if (filter_title_data.length > 0)
                return res.status(400).json({ message: "There is a similar Title available for the same day, kindly review" })

            const todo_data = new todoSchema({
                todo_title,
                todo_list,
                target_date,
                user: userData
            })

            await todo_data.save()
            res.status(200).json({ message: "Todo Data stored successfully", todo_data })

        } catch (error) {
            return res.status(401).json({ message: "Unable to save Todo data" })
        }
    },

    updateTodo: async (req, res) => {
        const { id } = req.params
        const { todo_title, todo_list, todo_status, target_date } = req.body

        console.log("latest:",todo_title)
        
        const userId = "67f3258715234418a0fe8649"

        console.log("#ID#: ", id)
        try {
            const userData = await userSchema.findById(userId)

            if(!userData)
                return res.status(400).json({message:"Invalid User"})
            console.log(userData)

            const todoData = await todoSchema.findById(id)

            if(!todoData)
                return res.status(400).json({message:"Invalid Todo Data"})

            console.log(todoData)

            let curr_date = new Date()

            //Validate Target Date with Current Date
            if (new Date(target_date) < new Date(curr_date))
                return res.status(400).json({ message: "Target Date is a Past date, kindly verify" })

            //Validates Duplication of Todo Title
            // const title_data = await todoSchema.find({ todo_title: todo_title })
            // const filter_title_data = title_data.filter(t_data => t_data.todo_title == todo_title &&
            //     new Date(t_data.target_date).toDateString() == new Date(target_date).toDateString())

            // if (filter_title_data.length > 0)
            //     return res.status(400).json({ message: "There is a similar Title available for the same day, kindly review" })

            const updateTodoData = await todoSchema.findByIdAndUpdate(id, {
                todo_title,
                todo_list,
                todo_status,
                target_date
            })

            res.status(200).json({ message: "Todo Updated successfully"})

        } catch (error) {
            res.status(500).json({ message: "Unable to modify Todo" })
        }
    }
}

module.exports = todoController