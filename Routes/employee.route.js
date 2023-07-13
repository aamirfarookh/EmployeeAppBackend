const express = require("express");
const { auth } = require("../Middlewares/auth.middleware");
const { getEmployees, addEmployee, editEmployee, deleteEmployee } = require("../Controllers/employee.controller");

const empRouter = express.Router();


empRouter.get("/getemployees",auth,getEmployees);

empRouter.post("/addemployee",auth,addEmployee);

empRouter.patch("/empupdate/:id",auth,editEmployee);

empRouter.delete("/empdelete/:id",auth,deleteEmployee);

module.exports = {empRouter}