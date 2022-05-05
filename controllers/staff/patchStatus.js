const staffManager = require('../../managers/staffManager');

async function patchStatus(req, res) {
    try {
        const staff = new staffManager;
        const { id, status } = req.body;
        const memberStatus = await staff.patchStatusMember(id, status);
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