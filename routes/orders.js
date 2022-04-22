const router = require("express").Router();

router.get('/:id', require('../controllers/orders/getOrder'));
router.get('/active', require('../controllers/orders/getStatus')); 
router.get('/delivered', require('../controllers/orders/getDeliveredDate')); 
router.get('/history', require('../controllers/orders/getHistoryOrders')); 
 
router.put('/stop/:id', require('../controllers/orders/stop'));
router.put('/cancel/:id', require('../controllers/orders/cancel'));
router.put('/finish/:id', require('../controllers/orders/finish'));

router.post('/new', require('../controllers/orders/postNewOrder')); 


module.exports = router;