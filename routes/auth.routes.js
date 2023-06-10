const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router()

const USER = []

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
(req, res)=>{

    const {name, email, password } = req.body;

    console.log("---post body---", name, email, password);

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

    USER.push(
        {
            name,
            email,
            password
        }
    )

    return res.status(201).json({
        message: "Success ! User registered",
        data: {},
        errors: null
    })
})

module.exports = router