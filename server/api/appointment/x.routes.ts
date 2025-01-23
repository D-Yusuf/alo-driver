import express from 'express';
import upload from '../../middleware/multer';
import passport from '../../middleware/passport';

const router = express.Router();
import { createAppointment, getAllAppointments, deleteAppointment, updateAppointment } from './x.controllers';

router.get('/', passport.authenticate('jwt', { session: false }), getAllAppointments);

router.post('/:familyId', passport.authenticate('jwt', { session: false }), createAppointment);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAppointment);

router.put('/:id', passport.authenticate('jwt', { session: false }), updateAppointment);





export default router;