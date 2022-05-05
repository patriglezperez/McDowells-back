import {Router} from 'express';
const router = Router();

//routes: 
import staff from "./staff.js"
import orders from "./orders.js"
import menu from "./menu.js"

router.use('/staff', staff);
router.use('/orders', orders);
router.use('./menu', orders)


export default router;
