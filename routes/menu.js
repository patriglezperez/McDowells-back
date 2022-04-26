const router = require("express").Router();

router.get('/all', require('../controllers/menu/getAll'));

module.exports = router;