const router = require("express").Router();

router.get('/all', require('../controllers/staff/getStaff'));
router.get('/:id', require('../controllers/staff/getStaffMember'));

router.put('/edit/:id', require('../controllers/staff/putStaff'));

router.patch('/status', require('../controllers/staff/patchStatus'))

router.post('/login', require('../controllers/staff/postLogin'));
router.post('/new', require('../controllers/staff/postNewStaff'));


module.exports = router;
