const express = require('express')
const todoController = require("../controllers/todoController.js")

const router = express.Router()

router.get("/all-todos",todoController.getTodoData)
router.post("/create-todo", todoController.createTodo)
router.put("/update-todo/:id", todoController.updateTodo)
router.delete("/delete-todo/:id", todoController.deleteTodo)

module.exports = router