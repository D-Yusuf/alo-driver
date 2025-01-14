import express from 'express';
import upload from '../../middleware/multer';
const router = express.Router();
import { signup, login, getAllUsers } from './x.controllers';


router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAllUsers);






// REFRENCE ⬇️

// const { postsGet, postsUpdate, postsDelete, postsCreate } = require('./posts.controllers');

// router.post('/', upload.single("image") ,postsCreate);

// router.delete('/:postId', postsDelete);

// router.put('/:postId', postsUpdate);

export default router;