const validUrl = require("valid-url");
const staffManager = require('../../managers/staffManager');

async function postLogin(req, res) {
    try {
        const staff = new staffManager;
        const { loginEmail, passWord } = req.body;
        /// if it is not a valid url we cancel???
        if (!validUrl.isUri(loginEmail)) {
            res.status(400).json("Invalid Url"); 
        }
        /// We validate that it is encrypted???
        const loginRetun = await staff.login(loginEmail, passWord);
        /// cambiar estado
        /// verificar rol para activar cola de cocina o reparto
        if (loginRetun) {
            res.json({"login": loginRetun[0].uuid_staff});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postLogin;