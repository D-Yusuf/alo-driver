import express from 'express';
import upload from '../../middleware/multer';
const router = express.Router();
import { register, login } from './x.controllers';


router.post('/register', register);







// REFRENCE ⬇️

// const { postsGet, postsUpdate, postsDelete, postsCreate } = require('./posts.controllers');
  
router.get('/login', (req, res, next) => {
  return res.json("Hello World")
});
// router.post('/', upload.single("image") ,postsCreate);

// router.delete('/:postId', postsDelete);

// router.put('/:postId', postsUpdate);

export default router;