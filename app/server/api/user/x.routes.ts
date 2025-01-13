import express from 'express';
import upload from '../../middleware/multer';
const router = express.Router();
import { register, login } from './x.controllers';


router.post('/register', register);
router.post('/login', login);






// REFRENCE ⬇️

// const { postsGet, postsUpdate, postsDelete, postsCreate } = require('./posts.controllers');

// router.post('/', upload.single("image") ,postsCreate);

// router.delete('/:postId', postsDelete);

// router.put('/:postId', postsUpdate);

export default router;