const db = require('./conn.js');

class DailyJobBoard {
    constructor (id, date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        this.id = id;
        this.date = date;
        this.firstjob = firstJob;
        this.commentsFirstJob = commentsFirstJob;
        this.secondJob = secondJob;
        this.commentsSecondJob = commentsSecondJob;
        this.employee_id = employee_id;
    }
    
    //get all 
    static async getAll() {
        try {
            const response = await db.any(`select * from dailyjobboard;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //get past jobs for one specific employee
    static async getJobById(employee_id) {
        try {
            const response = await db.one(`select * from dailyjobboard where id = ${employee_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //get past jobs by date
    static async getJobByDate(date) {
        try {
            const response = await db.one(`select * from dailyjobboard where id = ${date}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //add jobs
    static async addNewJob (date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        try {
            const response = await db.result(`INSERT INTO dailyjobboard (date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id)
                VALUES ($1, $2, $3, $4, $5, $6)`, [date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id])
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //update jobs
    static async updateJob(id, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        try {
            const response = await db.result(`
                UPDATE dailyjobboard
                SET ${column} = $1
                WHERE id = $2
            `, [firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id, id])
            return response;
        } catch (err) {
            return err.message
        }
    }

}

module.exports = DailyJobBoard;