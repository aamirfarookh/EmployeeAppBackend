const express = require("express");

const { signup, login } = require("../Controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signup",signup);

userRouter.post("/login",login);


module.exports = {userRouter};