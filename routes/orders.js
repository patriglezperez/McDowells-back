const router = require("express").Router();

router.get('/:id', require('../controllers/orders/id'));
router.get('/active', require('../controllers/orders/active'));
router.get('/delivered', require('../controllers/orders/delivered'));

router.put('/stop/:id', require('../controllers/orders/stop'));
router.put('/cancel/:id', require('../controllers/orders/cancel'));
router.put('/finish/:id', require('../controllers/orders/finish'));

router.post('/new', require('../controllers/orders/new'));


module.exports = router;