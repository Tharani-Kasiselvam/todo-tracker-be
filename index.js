const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')

const todoRoutes = require('./routes/todoRoutes.js')

const app = express()
const PORT = 3001

dotenv.config()

app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1", todoRoutes)

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB connected successfully", conn.connection.host)
    } catch (error) {
        console.log("Connectivity issue with MONGODB")
    }
    console.log("connected to http://localhost:3001")
})