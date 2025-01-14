import express from 'express';
import upload from '../../middleware/multer';
const router = express.Router();
import passport from '../../middleware/passport';
import { getAllDrivers, getAllUsers, getProfile } from './x.controllers';



router.get('/', getAllUsers);
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);


router.get('/drivers', getAllDrivers);



// REFRENCE ⬇️

// const { postsGet, postsUpdate, postsDelete, postsCreate } = require('./posts.controllers');

// router.post('/', upload.single("image") ,postsCreate);

// router.delete('/:postId', postsDelete);

// router.put('/:postId', postsUpdate);

export default router;