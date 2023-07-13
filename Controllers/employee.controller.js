const { Employee } = require("../Models/employee.model");

const addEmployee = async(req,res)=>{
    const {firstName,lastName,email,department,salary} = req.body;
    try {
        if(!firstName || !lastName || !email || !department || !salary){
            return res.status(400).send({msg:"All details are mandatory"})
        }
        const newEmployee = new Employee({...req.body});
        await newEmployee.save();
        return res.status(201).send({msg:"Employee created successfully"})
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}

const getEmployees = async(req,res)=>{
    
    try {
      const employees = await Employee.find();
      res.status(200).send({data:employees})  
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

const editEmployee = async(req,res)=>{
    const id = req.params.id
    const {firstName,lastName,email,department,salary} = req.body;
    try {
        const user = await Employee.findOne({_id:id});
        if(!user){
            return res.status(404).send({msg:"No user found with this id"})
        }

        const update = await Employee.findByIdAndUpdate(user._id,req.body);

        // await update.save();

        return res.status(201).send({msg:"Employee updated successfully"})

    } catch (error) {
        res.status(500).send({msg:error.message})
    }
};

const deleteEmployee = async(req,res)=>{
    const id = req.params.id
    try {
        const user = await Employee.findOne({_id:id});
        if(!user){
            return res.status(404).send({msg:"No user found with this id"})
        } 
        const deleted = await Employee.findByIdAndDelete(user._id);
        res.status(200).send({msg:"User deleted successfully",deleted})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

module.exports = {addEmployee,getEmployees,editEmployee,deleteEmployee}