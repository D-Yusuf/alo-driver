import Appointments from '../../models/Appointment';
import Users from '../../models/User';
import Families from '../../models/Family';
import { Request, Response, NextFunction } from 'express';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // if the appointment wasnt made by admin
        if(!req.body.user) {
            req.body.user = req.user._id
        }
        if(req.body.user !== req.user._id) {
            const family = (await Families.findOne({admins: { $in: [req.user._id] }}) || '') 
            if(!family) {
                return res.status(403).json({message: "Only admins can create an appointment for someone else"})
            }
        }
        const { user, driver, timeFrom, timeTo, location } = req.body
        const appointment = await Appointments.create({...req.body, createdBy: req.user._id})

        await Users.findByIdAndUpdate(user, { $push: { appointments: appointment._id } })
        await Users.findByIdAndUpdate(driver, { $push: { appointments: appointment._id } })

        return res.json(appointment)
    } catch (error: any) {
        next(error)
    }
}

export const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await Appointments.find()
        return res.json(appointments)
    } catch (error: any) {
        next(error)
    }
}

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointments.findByIdAndDelete(req.params.id)
        return res.json(appointment)
    } catch (error: any) {
        next(error)
    }
}

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointments.findByIdAndUpdate(req.params.id, req.body)
        return res.json(appointment)
    } catch (error: any) {
        next(error)
    }
}


  