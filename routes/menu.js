import {Router} from 'express';
const router = Router();

import getAll from '../controllers/menu/getAll.js'

router.get('/all', getAll);

export default router;