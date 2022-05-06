let router  = require('express').Router();

//Routes: GET
const getStaff = require("../controllers/staff/getStaff");
const getStaffMember = require("../controllers/staff/getStaffMember");

//Routes: PUT
const putStaff = require("../controllers/staff/putStaff")
const postLogin = require('../controllers/staff/postLogin');
const postNewStaff = require('../controllers/staff/postNewStaff');

router.patch('/status', require('../controllers/staff/patchStatus'))




//Router
router.get('/all', getStaff);
router.get('/:id', getStaffMember);

router.put('/edit/:id', putStaff);

router.post('/login', postLogin);
router.post('/new', postNewStaff);


module.exports = router;
