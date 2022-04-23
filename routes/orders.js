const router = require("express").Router();

router.get('/:id', require('../controllers/orders/getOrder'));
router.get('/active', require('../controllers/orders/getStatus')); 
router.get('/delivered', require('../controllers/orders/getDeliveredDate')); 
 
router.put('/stop/:id', require('../controllers/orders/putPaused'));
router.put('/cancel/:id', require('../controllers/orders/putCancelled'));
router.put('/finish/:id', require('../controllers/orders/putDelivered'));

router.post('/new', require('../controllers/orders/postNewOrder')); 


module.exports = router;