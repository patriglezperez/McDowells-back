const staffManager = require('../../manager/staff');

async function getStaff(req, res) {
    try {
        const staff = new staffManager;
        const staffAll = await staff.getStaff();
        if (staffAll) {
            res.json({"staffAll": staffAll});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getStaff;
