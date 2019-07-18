const db = require('./conn.js');

class Employee {
    constructor(id, FirstName, lastName, phoneNumber, email, experience, dateStarted) {
        this.id = id;
        this.FirstName = FirstName;
        this.lastName = lastName; 
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.experience = experience;
        this.dateStarted = dateStarted;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from employee;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(employee_id) {
        try {
            const response = await db.one(`select * from employee where id = ${employee_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async deleteEmployee(employee_id) {
        try {
            const response = await db.result(`delete from employee where id = ${employee_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addEmployee(firstName, lastName, phoneNumber, email, experience, dateStarted) {
        const query = `insert into employee
        (firstName, lastName, phoneNumber, email, experience, dateStarted)
    Values ('${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${experience}', '${dateStarted}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateEmployee(employeeId, firstName, lastName, phoneNumber, email, experience, dateStarted) {
        const query = `
            UPDATE employee 
            SET 
                firstname = '${firstName}', 
                lastname = '${lastName}', 
                phonenumber = '${phoneNumber}', 
                email = '${email}', 
                experience = '${experience}', 
                datestarted = ${dateStarted} 
            WHERE 
                id = '${employeeId}'`;
        console.log(query);
        try {
            const response = await db.result(query);
            console.log("response", response);
            return response;
        } catch (err) {
            return err.message;
        }
    }
    
}

module.exports = Employee;