const express = require('express');
const router = express.Router();

const DailyJobBoardModel = require ('../models/dailyJobBoard');

//create new job
router.post("/post/add", async (req,res) => {
    const { date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id } = req.body;
    const response = await DailyJobBoardModel.addNewJob(date, firstJob, commentsFirstJob, secondJob, commentsSecondJob, employee_id);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new job ${employee_id}`).status(409);
    }
});


module.exports = router;