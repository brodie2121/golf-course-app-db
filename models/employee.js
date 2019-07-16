const db = require('./conn.js');

class Employee {
    constructor(id, firstname, lastname, phonenumber, email, experience, datestarted) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname; 
        this.phonenumber = phonenumber;
        this.email = email;
        this.experience = experience;
        this.datestarted = datestarted;
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

    static async removeEmployee(employee_id) {
        try {
            const response = await db.result(`delete * from employee where id = ${employee_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addEmployee(firstname, lastname, phonenumber, email, experience, datestarted) {
        const query = `insert into posts
        (id, firstname, lastname, phonenumber, email, experience, datestarted)
    Values ('${firstname}', '${lastname}', '${phonenumber}', '${email}', '${experience}', '${datestarted}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateEmployee(firstname, lastname, phonenumber, email, experience, datestarted) {
        const query = `UPDATE employee SET ${column} = ${firstname}, ${lastname}, ${phonenumber}, ${email}, ${experience}, ${datestarted} WHERE id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
    
}

module.exports = Employee;