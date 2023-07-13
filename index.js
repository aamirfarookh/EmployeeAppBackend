const express = require("express");
const { connection } = require("./Config/db");
const cors = require("cors");
const { userRouter } = require("./Routes/user.route");
const { empRouter } = require("./Routes/employee.route");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user",userRouter)
app.use("/employees",empRouter)

app.listen(4500,async()=>{
    try {
        console.log("server is running on port 4500");
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
})