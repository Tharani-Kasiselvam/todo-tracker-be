const express = require('express')
const todoController = require("../controllers/todoController.js")

const router = express.Router()

router.post("/create-todo", todoController.createTodo)

module.exports = router