const staffManager = require('../../manager/staff');

async function getStaffMember(req, res) {
    try {
        console.log('lamierda esta', staffManager)
        const staff = new staffManager;
<<<<<<< HEAD
    
        console.log('this is in GetStaff member', staff)
        console.log('hay falla aqui:', req.params.id)

        const member = await staff.getStaffMember(req.params.id);
        console.log('this is the member',member)
=======
        ///console.log(staff)
        //console.log('req.params.uuid_staff-getStaffMember:', req.params.id)
        const member = await staff.getStaffMember(req.params.id);
        //console.log('member--getStaffMember:', member.rows[0])
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
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
