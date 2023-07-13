require("dotenv").config();
const jwt = require("jsonwebtoken")


const auth = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send({msg:"No token provided in headers"})
        }
        const decoded = jwt.verify(token,process.env.jwtSecretKey)
        if(!decoded){
            return res.status(400).send({msg:"Please login again"})
        }
        else{
            req.body.userId = decoded.userId;
            next()
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

module.exports = {auth}