const router = require("express").Router();

router.use('/staff', require('./staff'));
router.use('/orders', require('./orders'));
router.use('/menu', require('./menu'));

module.exports = router;
