const validator = require("email-validator");
const staffManager = require('../../manager/staff');

async function postLogin(req, res) {
    ///console.log('id:',req.params.id);
    try {
        ///console.log(staffManager);
        const staff = new staffManager;
        ///console.log('staff', staff);
        /// if it is not a valid url we cancel???
        /// cognito fer
        const verify = await staff.postLogin(req.params.id);
        //console.log('verify',verify);
        if (!verify) {
            res.status(400).json("Invalid ID"); 
        } else {
            /// We validate that it is encrypted???
            /* const loginRetun = await staff.login(loginEmail, passWord); */
            /// cambiar estado
            const loginRetun = await staff.patchStatusMember(req.params.id, 'active');
            /// verificar rol para activar cola de cocina o reparto
            //console.log('loginRetun', loginRetun);
            if (loginRetun) {
                const data = await staff.getStaffMember(req.params.id);
                res.json({ ...data.rows[0]}); /// loginRetun[0].uuid_staff
            } else {
                res.status(404).json("Not found");
        }}
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postLogin;
