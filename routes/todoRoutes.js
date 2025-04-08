const express = require('express')
const todoController = require("../controllers/todoController.js")

const router = express.Router()

router.post("/create-todo", todoController.createTodo)
router.put("/update-todo/:id", todoController.updateTodo)

module.exports = router