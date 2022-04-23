import {Router} from 'express';
const router = Router();

//Routes: GET
import getStaff from "../controllers/staff/getStaff.js"
import getStaffMember from "../controllers/staff/getStaffMember.js"

//Routes: PUT
import putStaff from '../controllers/staff/putStaff.js'

//Routes: POST
import postLogin from '../controllers/staff/postLogin.js'
import postNewStaff from '../controllers/staff/postNewStaff.js'


//Router
router.get('/all', getStaff);
router.get('/:id', getStaffMember);

router.put('/edit/:id', putStaff);

router.post('/login', postLogin);
router.post('/new', postNewStaff);


export default router;
