const staffManager = require('../../manager/menu');
const validUrl = require("valid-url");

async function putStaff(req, res) {
    try {
        const staff = new staffManager;
        const { uuid_staff, email, password, rol } = req.body;
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
