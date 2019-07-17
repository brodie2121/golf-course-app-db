const express = require("express");
const router = express.Router();

const SpraychartModel = require("../models/sprayChart");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.send("Welcome to my api").status(200);
});

router.get("/all", async (req, res, next) => {
    const allSpraycharts = await SpraychartModel.getAll();
    res.json(allSpraycharts).status(200);
});

router.get("/spraychart/:spraychart_id?", async (req, res) => {
    const spraychartId = req.params.spraychart_id;
    const theSpraychart = await SpraychartModel.getById(spraychartId);
    res.json(theSpraychart).status(200);
});

router.post("/post/add", async (req, res) => {
    const { dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled } = req.body;
    console.log(req.body);
    const response = await SpraychartModel.addSpraychart(dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new spraychart`).status(409);
    }
});

router.put("/spraychart/update/:spraychart_id?", async (req, res) => {
    const spraychartId = req.params.spraychart_id;
    console.log(req.body);
    const { dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled } = req.body;
    const response = await SpraychartModel.updateSpraychart(spraychartId, `dateApplied`, dateApplied, `employee_id`, employee_id, `holesTreated`, holesTreated, `lengthOfCutTreated`, lengthOfCutTreated, `chemicalsBeingUsed`, chemicalsBeingUsed, `rateApplied`, rateApplied, `totalGallons`, totalGallons, `sprayRig`, sprayRig, `pestOrDiseasedControlled`, pestOrDiseasedControlled);
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update spraychart ${spraychartId}`).status(409);
    } 
});

module.exports = router;