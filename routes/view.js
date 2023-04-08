const express = require("express")
const utils = require("../utils/utils")

const router = express.Router()

router.get("", (req, res) => {
    return utils.readData()
    .then((dataArr) => {
        // to render the files processed by view engine
        return res.render("index", {title: "Home", todos: dataArr})
    })
})

router.get("/todos/:title", (req, res) => {
    const title = req.params.toLowerCase()
    console.log("title is ", title.title);

    return utils.readData()
    .then((dataArr) => {
        const todoObj = dataArr.find((todo) => {
            console.log("element is ", todo);
            return todo.title.toLowerCase() === title 
        })
        console.log("todo is ", todoObj);
        return res.render("todo", {title: "Update"}, todoObj)
    })
})
module.exports = router