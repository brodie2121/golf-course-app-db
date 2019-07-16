const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/employee");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.send("Welcome to my api").status(200);
});

router.get("/all", async (req, res, next) => {
    const allEmployees = await EmployeeModel.getAll();
    res.json(allEmployees).status(200);
});

router.get("/employee/:employee_id?", async (req, res) => {
    const employeeId = req.params.employee_id;
    const theEmployee = await EmployeeModel.getById(employeeId);
    res.json(theEmployee).status(200);
});

router.post("/employee/add", async (req, res) => {
    const { firstname, lastname, phonenumber, email, experience, datestarted } = req.body;
    console.log(req.body);
    const response = await EmployeeModel.createEntry(firstname, lastname, phonenumber, email, experience, datestarted);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new employee ${employee_id}`).status(409);
    }
});

router.put("/employee/update/:employee_id?", async (req, res) => {
    const employeeId = req.params.employee_id;
    console.log(req.body);
    const { firstname, lastname, phonenumber, email, experience, datestarted } = req.body;
    const response = await EmployeeModel.updateEmployee(employeeId, `firstname`, firstname, `lastname`, lastname, `phonenumber`, phonenumber, `email`, email, `experience`, experience, `datestarted`, datestarted);
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update employee id ${employeeId}`).status(409);
    } 
});

module.exports = router;