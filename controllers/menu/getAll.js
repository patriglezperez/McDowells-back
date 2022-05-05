import menuManager from '../../managers/menu.js';

async function getAll(req, res) {
    try {
        const menu = new menuManager;
        const menuAll = await menu.getAll();
        if (menuAll) {
            res.json({"menuAll": menuAll});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

export default getAll;