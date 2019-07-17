const db = require('./conn.js');


class Spraychart {
    constructor(id, dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseaseControlled) {
        this.id = id;
        this.dateApplied = dateApplied;
        this.employee_id = employee_id; 
        this.holesTreated = holesTreated;
        this.lengthOfCutTreated = lengthOfCutTreated;
        this.chemicalsBeingUsed = chemicalsBeingUsed;
        this.rateApplied = rateApplied;
        this.totalGallons = totalGallons;
        this.sprayRig = sprayRig;
        this.pestOrDiseaseControlled = pestOrDiseaseControlled;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from spraychart;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(spraychart_id) {
        try {
            const response = await db.one(`select * from spraychart where id = ${spraychart_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async removeChart(spraychart_id) {
        try {
            const response = await db.result(`delete * from spraychart where id = ${spraychart_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addSpraychart(dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseaseControlled) {
        const query = `insert into spraychart
        (dateapplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseaseControlled)
    Values ('${dateApplied}', '${employee_id}', '${holesTreated}', '${lengthOfCutTreated}', '${chemicalsBeingUsed}', '${rateApplied}', '${totalGallons}', '${sprayRig}', '${pestOrDiseaseControlled}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateEmployee(dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseaseControlled) {
        const query = `UPDATE spraychart SET ${column} = ${dateApplied}, ${employee_id}, ${holesTreated}, ${lengthOfCutTreated}, ${chemicalsBeingUsed}, ${rateApplied}, ${totalGallons}, ${sprayRig}, ${pestOrDiseaseControlled} WHERE id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
    
}

module.exports = Spraychart;