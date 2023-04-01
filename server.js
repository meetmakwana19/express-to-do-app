const express = require("express")
const utils = require("./utils/utils")
const app = express()

// making a greeting call to check server is running or not
app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

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

app.listen(3000, () => {
    console.log("Todo server is running");
})