const staffManager = require('../../manager/staff');

async function getStaffMember(req, res) {
    try {
        console.log('lamierda esta', staffManager)
        const staff = new staffManager;
    
        console.log('this is in GetStaff member', staff)
        console.log('hay falla aqui:', req.params.id)

        const member = await staff.getStaffMember(req.params.id);
        console.log('this is the member',member)
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
