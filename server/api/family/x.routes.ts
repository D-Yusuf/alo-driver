import express from 'express';
import upload from '../../middleware/multer';
import passport from '../../middleware/passport';
import { createFamily, getFamily, updateFamily, deleteFamily, getAllFamilies } from './x.controllers';
const router = express.Router();

router.get('/', getAllFamilies)
router.get('/:userId', getFamily)
router.post('/', passport.authenticate('jwt', { session: false }), createFamily)
router.put('/:userId', passport.authenticate('jwt', { session: false }), updateFamily)
router.delete('/:userId', passport.authenticate('jwt', { session: false }), deleteFamily)


export default router;