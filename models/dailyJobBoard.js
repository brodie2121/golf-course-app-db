const db = require('./conn.js');

class DailyJobBoard {
    constructor (id, posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        this.id = id;
        this.posting_date = posting_date;
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
    //delete job
    static async deleteJob(job_id) {
        try {
            const response = await db.result(`delete from dailyjobboard where id = ${job_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //get job by job id
    static async getJobById(job_id) {
        try {
            const response = await db.one(`select * from dailyjobboard where id = ${job_id}`);
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

    //get jobs by date
    static async getJobByDate(posting_date) {
        try {
            const response = await db.one(`select * from dailyjobboard where id = ${posting_date}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    //add jobs
    static async addNewJob(posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        const query = `insert into dailyjobboard
        (posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id)
    Values ('${posting_date}', '${firstJob}', '${commentsFirstJob}', '${secondJob}', '${commentsSecondJob}', '${employee_id}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateJob(dailyjobboardId, posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id) {
        const query = `
            UPDATE dailyjobboard 
            SET 
                posting_date = '${posting_date}', 
                firstjob = '${firstJob}', 
                commentsfirstjob = '${commentsFirstJob}', 
                secondjob = '${secondJob}', 
                commentssecondjob = '${commentsSecondJob}', 
                employee_id = ${employee_id} 
            WHERE 
                id = '${dailyjobboardId}'`;
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

module.exports = DailyJobBoard;