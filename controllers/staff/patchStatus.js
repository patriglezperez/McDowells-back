const staffManager = require('../../manager/menu');

async function patchStatus(req, res) {
    try {
        const staff = new staffManager;
        const { uuid_staff, statuss } = req.body;
        const memberStatus = await staff.patchStatusMember(uuid_staff, statuss);
        if (memberStatus) {
            res.json();
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = patchStatus;