import { Router } from 'express';
import { create, deleteById, readAll, readById } from '../controllers/comment.controller.js';
import { create, deleteById, readAll, readById } from '../controllers/user.controller.js';
// import { createUser, getUsers } from '../middleware/test.js';
const router = Router();

//router.route('/').get((req, res) => res.sendStatus(200));

router.get('/getAllComments', readAll, (req, res) => {
	res.end(JSON.stringify(req.users));
});
router.post('/', create, (req, res) => {
	res.end('Success!');
});

export default router;
