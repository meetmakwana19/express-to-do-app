const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router()
var jwt = require('jsonwebtoken');
const { SECRET } = require("../config")
const utils = require("../utils/utils")
const fs = require("fs/promises")
const bcrypt = require("bcryptjs")

// const USER = []

router.post("/register",
// custom validator 
body("name").custom((name)=>{
    if(typeof name === "string" && name.length >= 2){
        return true
    }
    return false 
})
.withMessage("Name should be of minimum 2 characters."),
body("email").custom((email)=>{
    if(typeof email === "string"){
        return true
    }
    return false 
})  
.withMessage("Please provide a valid email")
.isEmail().withMessage("Enter a valid email"),
body("password").custom((password)=>{
    if(typeof password === "string" && password.length >= 8){
        return true
    }
    return false 
})
.withMessage("Password should be atleast 8 characters"),
async (req, res)=>{

    // const {name, email, password } = req.body;
    const newUser = req.body;

    // console.log("---post body---", name, email, password);

    // to show errors in the response object
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("---erors---", errors);
         return res.status(400).json({
            message: "Registration failed.",
            error: errors.array(),
            data: {}
         })
    }
    try{

        const salt = await bcrypt.genSalt(10);
        securedPassword = await bcrypt.hash(req.body.password, salt)

        const securedUser = {...newUser, password: securedPassword}

        utils.readUsers()
        .then((data) => {
            data.push(securedUser)
            
            return fs.writeFile("users.json", JSON.stringify(data))
        })
        .then(() => {
            const token = jwt.sign( newUser.email, SECRET )

            // 201 for resource creation
            return res.status(201).json({
                message: "New User Registered",
                data: {
                    newUser,
                    access_token: token
                },
                error: null
            })
        })
    }
    catch(error){
        console.error("Error: ", error.message)
        res.status(500).send("Internal server error occured.")
    }
    /*
    USER.push(
        {
            name,
            email,
            password
        }
    )
    */
})

router.post("/login", (req, res) => {
    const { email, password }= req.body

    // console.log("---post body---", email, password);

    return utils.readUsers()

    // using async here because need to use await down there with bcrypt
    .then( async (user_data) => {
        if(user_data.length <= 0){
            return res.status(404).json({
                message: "User login failed.",
                error: "User does not exist",
                data: {}
            })
        }
        
        // this is not a very good approach due to nesting of lots of if conditions
        // else if (USER.find(user => user.email === email){
            //     if(password)
        // })
    
        const userIndex = user_data.findIndex((user) => user.email === email)

        if(userIndex === -1){
            return res.status(404).json({
                message: "User login failed.",
                error: "The user does not exist",
                data: {}
            })
        }
        
        const passwordCompare = await bcrypt.compare(password, user_data[userIndex].password)

        // if(user_data[userIndex].password != password){
        if(!passwordCompare){
            return res.status(404).json({
                message: "User login failed.",
                error: "Password does not match",
                data: {}
            })
        }

        
        // create access token
        // use jwt token 
        const token = jwt.sign( {email}, SECRET )
        
        // return token 
        return res.status(200).json({
            message: "Success ! User logged in",
            data: {
                access_token: token
            },
            errors: null
        })
    })
    .catch((error) => {
        console.error("Error: ", error.message)
        res.status(500).send("Internal server error occured.")
    })
})

module.exports = router