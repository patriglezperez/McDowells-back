const menuManager = require('../../manager/menu');

async function getAll(req, res) {
    try {
        /* const menu = new menuManager;
        console.log('this is the menu:', menu) */
        const menuAll = await menuManager.getAll();
        console.log(menuAll)
        if (menuAll) {
            res.json({"menuAll": menuAll});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Server Error");
    }
}

module.exports = getAll;