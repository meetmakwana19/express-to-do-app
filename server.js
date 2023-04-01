const express = require("express")

const app = express()

// making a greeting call to check server is running or not
app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

app.listen(3000, () => {
    console.log("Todo server is running");
})