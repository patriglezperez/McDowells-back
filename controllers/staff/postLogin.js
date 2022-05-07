const validator = require("email-validator");
const staffManager = require('../../manager/staff');

async function postLogin(req, res) {
    try {
        const staff = new staffManager;
        const { loginEmail, passWord } = req.body;
        /// if it is not a valid url we cancel???
        /// cognito fer
        const verify = await staff.decide(id)
        if (!verify) {
            res.status(400).json("Invalid ID"); 
        } else {
            /// We validate that it is encrypted???
            /* const loginRetun = await staff.login(loginEmail, passWord); */
            /// cambiar estado
            const loginRetun = await staff.patchStatusMember(id, 'active');
            /// verificar rol para activar cola de cocina o reparto
            if (loginRetun) {
                res.json({"login": loginRetun[0].uuid_staff});
            } else {
                res.status(404).json("Not found");
        }}
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postLogin;
