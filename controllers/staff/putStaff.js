const staffManager = require('../../manager/staff');
const validUrl = require("valid-url");

async function putStaff(req, res) {
    try {
        const staff = new staffManager;
        console.log(staff)
        const { uuid_staff, email, password, rol } = req.body;
        console.log(req.body.email)
        // if it is not a valid url we cancel
        if (!validUrl.isUri(email)) {
            res.status(400).json("Invalid Url"); 
        }
        const updateStaff = await staff.updateStaff(uuid_staff, email, password, rol);
        if (updateStaff) {
            res.json({"updateStaff": updateStaff});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = putStaff;
