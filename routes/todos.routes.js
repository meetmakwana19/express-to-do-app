const express = require("express")
const fs = require("fs/promises")
const utils = require("../utils/utils")

// calling function express.Router() which is used to channelise all the routers
const todoRouter = express.Router()

// http://localhost:3000/todos
todoRouter.get("/", (req, res)=>{
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
todoRouter.post("/", (req, res) => {
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


// module.exports = {
//     // todoRouter
//     router: todoRouter
// }
module.exports = todoRouter
