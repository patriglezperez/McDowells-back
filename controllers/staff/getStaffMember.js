const staffManager = require('../../manager/menu');

async function getStaffMember(req, res) {
    try {
        const staff = new staffManager;
        const member = await staff.getMember(req.params.Id);
        if (member) {
            res.json({"member": member});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getStaffMember;
