const todoSchema = require('../models/todoModel')
const userSchema = require('../models/userModel')

const todoController = {
    createTodo: async (req, res) => {
        const { todo_title, todo_list, target_date } = req.body

        if (!todo_title || !todo_list || !target_date)
            return res.status(400).json({ message: "Kindly provide values for all the fields" })

        //manually created
        const id = "67f149e115234418a0fe8645"

        try {

            const userData = await userSchema.findById(id)

            if (!userData)
                return res.status(400).json({ message: "Invalid User" })

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

        console.log("latest:", todo_title)


        //manually created
        const userId = "67f149e115234418a0fe8645"

        console.log("#ID#: ", id)
        console.log("#userId#: ", userId)

        try {
            const userData = await userSchema.findById(userId);

            if (!userData) {
                return res.status(404).json({ message: "Invalid User" });
            }

            const existing_todoData = await todoSchema.findById(id)
            const isUserTodo = await todoSchema.findOne({_id: id, user : userId})

            console.log("IsUserTodo:", isUserTodo)

            if (!existing_todoData || !isUserTodo)
                return res.status(400).json({ message: "Invalid Todo Data" })

            console.log("Existing todoData:", existing_todoData)

            let curr_date = new Date()
            const dateValue = (target_date ? target_date : existing_todoData.target_date)
            const titleValue = (todo_title ? todo_title : existing_todoData.todo_title)

            console.log("updated Tar dateValue:", dateValue, "CURR dt:", curr_date)

            //Validate Target Date with Current Date
            if (dateValue && new Date(dateValue) < new Date(curr_date)) {
                // dateValue = target_date
                console.log("**inside if of taraget date validation**")
                return res.status(400).json({ message: "Target Date is a Past date, kindly verify" })
            }

            // Validation of Duplicate Todo Title
            console.log("updated title:", todo_title, "EXISTING title:", titleValue)
            const title_data = await todoSchema.find({ user: userId, todo_title: titleValue })
            console.log("existing Title data:", title_data)
            let filter_title_data = []
            if (title_data.length > 0) {
                console.log("Inside ttl dt if")
                filter_title_data = title_data.filter(t_data => new Date(t_data.target_date).toDateString() == new Date(dateValue).toDateString())
            }

            console.log("Filtered data:", filter_title_data)

            if (filter_title_data.length > 0) {//validation works only for todo_title
                if (todo_title) {
                    return res.status(400).json({ message: "There is a similar Title available for the same day, kindly review" })
                }
                else if (target_date) {
                    return res.status(400).json({ message: "There is a similar Title available for the same day, kindly review" })
                }
                else {
                    console.log("##inside fltr data condn##")
                    const updateTodoData = await todoSchema.findByIdAndUpdate(id, {
                        todo_title: titleValue,
                        todo_list: todo_list ? todo_list : existing_todoData.todo_list,
                        todo_status: todo_status ? todo_status : existing_todoData.todo_status,
                        target_date: dateValue
                    })
                    return res.status(200).json({ message: "Todo Updated successfully" })
                }
            }
            else {
                console.log("##inside fltr data condn##")
                const updateTodoData = await todoSchema.findByIdAndUpdate(id, {
                    todo_title: titleValue,
                    todo_list: todo_list ? todo_list : existing_todoData.todo_list,
                    todo_status: todo_status ? todo_status : existing_todoData.todo_status,
                    target_date: dateValue
                })
                return res.status(200).json({ message: "Todo Updated successfully" })
            }

        } catch(error) {
        res.status(500).json({ message: "Unable to modify Todo" })
    }
}
}

module.exports = todoController