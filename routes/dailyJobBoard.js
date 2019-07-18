const express = require('express');
const router = express.Router();

const DailyJobBoardModel = require ('../models/dailyJobBoard');

router.get('/home', (req, res, next) => {
    res.send("Welcome to my API").status(200);
});

//read all
router.get("/all", async (req, res, next) => {
    const allJobs = await DailyJobBoardModel.getAll();
    res.json(allJobs).status(200);
});

//get jobs by date
router.get('/jobs/${posting_date}', async (req, res, next) => {
    const posting_date = req.params.posting_date;
    const date = await DailyJobBoardModel.getJobByDate(posting_date);
    res.json(date).status(200);
});


router.get("/jobs/:job_id?", async (req, res, next) => {
    const jobId = req.params.job_id;
    const theJob = await DailyJobBoardModel.getJobById(jobId);
    res.json(theJob).status(200);
});
  

//delete job
router.get("/delete/:job_id?", async (req, res, next) => {
    const jobId = req.params.job_id;
    const response = await DailyJobBoardModel.deleteJob(jobId);
    console.log("response", response)
    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete jobId: ${jobId}`).status(409);
    }
});



//create new job
router.post("/post/add", async (req,res) => {
    const { posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id } = req.body;
    const response = await DailyJobBoardModel.addNewJob(posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id);

    (response.command === "INSERT" && response.rowCount >= 1) ? res.sendStatus(200) : res.send(`Could not add new job ${employee_id}`).status(409);
});

//update job 
router.put("/jobs/update/:job_id?", async (req, res) => {
    const dailyjobboardId = req.params.dailyjobboard_id;
    console.log(req.body);
    const { posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id } = req.body;
    const response = await DailyJobBoardModel.updateJob(dailyjobboardId, posting_date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id);
    console.log("response is", response)
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update dailyjobboardId ${dailyjobboardId}`).status(409);
    } 
});

module.exports = router;