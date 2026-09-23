const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function login(req, res){
    const { email, password} = req.body

    if(!email || !password ){
        return res.status(400).json({
            "messsage" : "Invalid Input"
        })
    }

    const existingUser = await User.findOne({email : email})

    console.log(existingUser)
    if(!existingUser){
         return res.status(400).json({
            "messsage" : "Email is not registered, please register"
        })
    }
 
    const checkPassword = await bcrypt.compare(password, existingUser.password)

    if(!checkPassword){
         return res.status(400).json({
            "messsage" : "Wrong Password"
        })
    }

    const token = jwt.sign({id:existingUser._id} , process.env.SECRET_KEY, { expiresIn: '7d' })

    res.status(200).json({
        "messsage" : "Login Successfully",
        "token" : token
    })
}

async function register(req, res){
    const {name, email, password, role} = req.body

    if(!name || !email || !password || !role || !['student', 'instructor'].includes(role)){
        return res.status(400).json({
            "messsage" : "Invalid Input"
        })
    }

    const existingUser = await User.findOne({email : email})

    if(existingUser){
         return res.status(400).json({
            "messsage" : "Email already registered"
        })
    }

    const encryptPassword = await bcrypt.hash(password, 4)

    const newUser = await User.create({
        name : name,
        email : email,
        password : encryptPassword,
        role : role
    })


    res.status(200).json({
        "messsage" : "User Registered Successfully"
    })
}


module.exports = {
    login,
    register
}
