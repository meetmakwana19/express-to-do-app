const express = require("express")
const fs = require("fs/promises")
const utils = require("./utils/utils")
const todoRoute = require("./routes/todos.routes")

// initialize express app
const app = express()

// middlewares

// **VERY IMP - this is used to collect data from req.body in chunks
app.use(express.json())

// making a greeting call to check server is running or not
app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

// THIS IS BASE URL
// http://localhost:3000/todos

// app.use("/todos", todoRoute.router) // if using const todoRoute = require() along with module.exports = { router: todoRouter }
app.use("/todos", todoRoute) // if module.exports = todoRouter


// ROUTERS
app.get("/todos", (req, res) => {
    // return res.send("Todos are here")

    return utils.readData()
    .then((data)=> {
        res.status(200).json({
            message: "All todos fetched",
            // data: data,
            data,
            error: null
        })
    })
})

app.post("/todos", (req, res) => {
    const newTodo = req.body

    return utils.readData()
    .then((data)=>{
        data.push(newTodo)

        // writing the JSON object after converting it to string
        return fs.writeFile("db.json", JSON.stringify(data))
    })
    .then(()=>{
        return res.status(201).json({
            message: "All todos fetched",
            data: newTodo,
            error: null
        })
    })
})
app.listen(3000, () => {
    console.log("Todo server is running");
})