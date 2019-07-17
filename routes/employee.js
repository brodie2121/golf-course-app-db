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

router.get("/employees/:employee_id?", async (req, res) => {
    const employeeId = req.params.employee_id;
    const theEmployee = await EmployeeModel.getById(employeeId);
    res.json(theEmployee).status(200);
});

router.get("/delete/:employee_id?", async (req, res, next) => {
    const employeeId = req.params.employee_id;
    const response = await EmployeeModel.deleteEmployee(employeeId);
    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete employeeId: ${employeeId}`).sendStatus(409);
    }
});

router.post("/post/add", async (req, res) => {
    const { firstName, lastName, phoneNumber, email, experience, dateStarted } = req.body;
    console.log(req.body);
    const response = await EmployeeModel.addEmployee( firstName, lastName, phoneNumber, email, experience, dateStarted);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new employee`).status(409);
    }
});

router.put("/employees/update/:employee_id?", async (req, res) => {
    const employeeId = req.params.employee_id;
    console.log(req.body);
    const { firstName, lastName, phoneNumber, email, experience, dateStarted } = req.body;
    const response = await EmployeeModel.updateEmployee(employeeId, `firstName`, firstName, `lastName`, lastName, `phoneNumber`, phoneNumber, `email`, email, `experience`, experience, `dateStarted`, dateStarted);
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update employee id ${employeeId}`).status(409);
    } 
});

module.exports = router;