const router = require("express").Router();

router.get('/all', require('../controllers/staff/all'));
router.get('/:id', require('../controllers/staff/id'));

router.put('/edit/:id', require('../controllers/staff/edit'));

router.post('/login', require('../controllers/staff/login'));
router.post('/new', require('../controllers/staff/new'));


module.exports = router;
