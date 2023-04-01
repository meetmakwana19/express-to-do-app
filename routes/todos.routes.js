const express = require("express")

// calling function express.Router() which is used to channelise all the routers
const todoRouter = express.Router()

// http://localhost:3000/todos
todoRouter.get("/", (req, res)=>{
    return res.send("Hello from todo router.")
})

// module.exports = {
//     // todoRouter
//     router: todoRouter
// }
module.exports = todoRouter
