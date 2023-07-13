const { User } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
       if(!name || !email || !password){
        return res.status(400).send({msg:"All details are mandatory"})
       } 
       const userPresent = await User.findOne({email});
       if(userPresent){
        return res.status(400).send({msg:"User already present, please login"})
       }
       const hashedPass = bcrypt.hashSync(password,8)
       const newUser = new User({...req.body,password:hashedPass});
       await newUser.save();
       return res.status(201).send({msg:"Signup Successful"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
};


const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(400).send({msg:"Missing email or password"})
        }
        const userPresent = await User.findOne({email});
        if(!userPresent){
            return res.status(404).send({msg:"No user found, please signup first"})
        }
        const isPasswordMatch = bcrypt.compareSync(password,userPresent.password);

        if(!isPasswordMatch){
            return res.status(400).send({msg:"Wrong Credentials"})
        }

        const token = jwt.sign({userId:userPresent._id,email},process.env.jwtSecretKey);

        return res.status(200).send({msg:"login success",token})

    } catch (error) {
        res.status(500).send({msg:error.message})
    }
};

module.exports = {signup,login}