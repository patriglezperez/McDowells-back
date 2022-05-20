const staffManager = require('../../manager/staff');

async function getStaffMember(req, res) {
    try {
        console.log('lamierda esta', staffManager)
        const staff = new staffManager;
        ///console.log(staff)
        //console.log('req.params.uuid_staff-getStaffMember:', req.params.id)
        const member = await staff.getStaffMember(req.params.id);
        //console.log('member--getStaffMember:', member.rows[0])
        if (member) {
            res.json({"member": member.rows[0]});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getStaffMember;
