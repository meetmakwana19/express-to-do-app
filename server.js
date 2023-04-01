const express = require("express")
const fs = require("fs/promises")

const app = express()

// making a greeting call to check server is running or not
app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

// -------To read data from db.json
// readData() is a promise as fs.readFile() is a promise which is getting returned to it's parent so will need to resolve it while calling it in the app.get()
function readData(){
    return fs.readFile("db.json", "utf-8")
    .then((data)=>{
        // readFile reads the array/JSON object{} from the db.json in string format so to return in JSON form we do JSON.parse
        // and data.toString() for safety so that a string is converted to JSON as JSON parsing can through error if string is not proper
        return JSON.parse(data.toString())
    })
}
// ROUTERS
app.get("/todos", (req, res) => {
    // return res.send("Todos are here")

    return readData()
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