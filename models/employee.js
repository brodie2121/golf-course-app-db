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
            const response = await db.result(`delete * from employee where id = ${employee_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addEmployee(FirstName, lastName, phoneNumber, email, experience, dateStarted) {
        const query = `insert into employee
        (FirstName, lastName, phoneNumber, email, experience, dateStarted)
    Values ('${FirstName}', '${lastName}', '${phoneNumber}', '${email}', '${experience}', '${dateStarted}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateEmployee(FirstName, lastName, phoneNumber, email, experience, dateStarted) {
        const query = `UPDATE employee SET ${column} = ${FirstName}, ${lastName}, ${phoneNumber}, ${email}, ${experience}, ${dateStarted} WHERE id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
    
}

module.exports = Employee;