const router = require("express").Router();

router.use('/staff', require('./staff'));
router.use('/orders', require('./orders'));


module.exports = router;
