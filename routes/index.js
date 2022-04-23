import {Router} from 'express';
const router = Router();

//routes: 
import staff from "./staff.js"
import orders from "./orders.js"

router.use('/staff', staff);
router.use('/orders', orders);


export default router;
