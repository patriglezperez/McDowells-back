const staffManager = require('../../manager/staff');

async function patchStatus(req, res) {
    try {
        const staff = new staffManager;
        const { id, statuss } = req.body;
        const memberStatus = await staff.patchStatusMember(id, statuss);
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