const staffManager = require('../../manager/staff');

async function patchStatus(req, res) {
    try {
        const staff = new staffManager;
        console.log('req.body-patchStatus:',req.body);
        const { id, statuss } = req.body;
        console.log('req.body-patchStatus--id:', id, 'statuss:', statuss)
        const memberStatus = await staff.patchStatusMember(id, statuss);
        //console.log('memberStatus-patchStatus:', memberStatus);
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