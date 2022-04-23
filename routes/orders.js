import {Router} from 'express';
const router = Router();

// routes: GET
import getOrder from "../controllers/orders/getOrder.js"
import getStatus from "../controllers/orders/getStatus.js"
import getDeliveredDate from "../controllers/orders/getDeliveredDate.js"

//routes: PUT
import putPaused from "../controllers/orders/putPaused.js "
import putCancelled from "../controllers/orders/putCancelled.js "
import putDelivered from "../controllers/orders/putDelivered.js "

//routes: POST
import postNewOrder from "../controllers/orders/postNewOrder.js"

//ROUTER
router.get('/:id', getOrder);
router.get('/active', getStatus); 
router.get('/delivered', getDeliveredDate); 
 
router.put('/stop/:id', putPaused);
router.put('/cancel/:id', putCancelled);
router.put('/finish/:id', putDelivered);

router.post('/new', postNewOrder); 


export default router;