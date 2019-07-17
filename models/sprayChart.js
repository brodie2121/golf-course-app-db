const db = require('.conn.js');


class Spraychart {
    constructor(id, dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled) {
        this.id = id;
        this.dateApplied = dateApplied;
        this.employee_id = employee_id; 
        this.holesTreated = holesTreated;
        this.lengthOfCutTreated = lengthOfCutTreated;
        this.chemicalsBeingUsed = chemicalsBeingUsed;
        this.rateApplied = rateApplied;
        this.totalGallons = totalGallons;
        this.sprayRig = sprayRig;
        this.pestOrDiseasedControlled = pestOrDiseasedControlled;
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

    static async addSpraychart(dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled) {
        const query = `insert into posts
        (dateapplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled)
    Values ('${dateApplied}', '${employee_id}', '${holesTreated}', '${lengthOfCutTreated}', '${chemicalsBeingUsed}', '${rateApplied}', '${totalGallons}', '${sprayRig}', '${pestOrDiseasedControlled}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async updateEmployee(dateApplied, employee_id, holesTreated, lengthOfCutTreated, chemicalsBeingUsed, rateApplied, totalGallons, sprayRig, pestOrDiseasedControlled) {
        const query = `UPDATE spraychart SET ${column} = ${dateApplied}, ${employee_id}, ${holesTreated}, ${lengthOfCutTreated}, ${chemicalsBeingUsed}, ${rateApplied}, ${totalGallons}, ${sprayRig}, ${pestOrDiseasedControlled} WHERE id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
    
}

module.exports = Spraychart;