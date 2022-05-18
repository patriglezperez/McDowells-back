const staffManager = require('../../manager/staff');

async function getStaffMember(req, res) {
    try {
        const staff = new staffManager;
        console.log(staff)
        console.log(req.params.uuid_staff)
        const member = await staff.getStaffMember(req.params.uuid_staff);
        console.log(member)
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
