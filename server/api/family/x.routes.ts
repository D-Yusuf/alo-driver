import express from 'express';
import upload from '../../middleware/multer';
import passport from '../../middleware/passport';
import { createFamily, getFamily, updateFamily, deleteFamily } from './x.controllers';
const router = express.Router();


router.post('/', passport.authenticate('jwt', { session: false }), createFamily)
router.get('/:userId', passport.authenticate('jwt', { session: false }), getFamily)
router.put('/', passport.authenticate('jwt', { session: false }), updateFamily)
router.delete('/:userId', passport.authenticate('jwt', { session: false }), deleteFamily)









// REFRENCE ⬇️

// const { postsGet, postsUpdate, postsDelete, postsCreate } = require('./posts.controllers');
  
router.get('/test', (req, res) => {
  res.json("Hello World")
});
// router.post('/', upload.single("image") ,postsCreate);

// router.delete('/:postId', postsDelete);

// router.put('/:postId', postsUpdate);

export default router;