import Appointments from '../../models/Appointment';
import Users from '../../models/User';
import Families from '../../models/Family';
import { Request, Response, NextFunction } from 'express';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ensure family is set for non-admin appointment creation.
        req.body.family = req.params.familyId;
        if (!req.body.user) {
            req.body.user = req.user._id;
        }
        if (req.body.user !== req.user._id) {
            const family = (await Families.findOne({ admins: { $in: [req.user._id] } }) || '');
            if (!family) {
                return res.status(403).json({ message: "Only admins can create an appointment for someone else" });
            }
        }

        // Destructure and validate required fields from req.body
        const { user, driver, timeFrom, timeTo, location, days } = req.body;
        if (!days || !Array.isArray(days) || days.length === 0) {
            return res.status(400).json({ message: "A valid 'days' array is required" });
        }

        // Helper function to convert a "HH:mm" time string to minutes since midnight.
        const timeStringToMinutes = (time: string): number => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        // Convert new appointment times to minutes.
        const newFrom = timeStringToMinutes(timeFrom);
        const newTo = timeStringToMinutes(timeTo);

        // Get any existing appointments for the driver that occur on at least one of the new appointment's days.
        const existingAppointments = await Appointments.find({
            driver: driver,
            days: { $in: days }
        });

        // Check each of the driver's existing appointments for a time conflict on overlapping days.
        for (const appointment of existingAppointments) {
            // Find common days between the new appointment and the existing appointment.
            const overlappingDays = appointment.days.filter((day: string) => days.includes(day));
            if (overlappingDays.length > 0) {
                const existingFrom = timeStringToMinutes(appointment.timeFrom);
                const existingTo = timeStringToMinutes(appointment.timeTo);
                // Standard overlap: newFrom < existingTo and newTo > existingFrom.
                if (newFrom < existingTo && newTo > existingFrom) {
                    return res.status(400).json({
                        message: "Driver already has an overlapping appointment in the same time range on overlapping days"
                    });
                }
            }
        }

        // No conflict found; create the new appointment.
        const appointment = await Appointments.create({ ...req.body, createdBy: req.user._id });

        await Users.findByIdAndUpdate(user, { $push: { appointments: appointment._id } });
        await Users.findByIdAndUpdate(driver, { $push: { appointments: appointment._id } });
        await Families.findByIdAndUpdate(req.params.familyId, { $push: { appointments: appointment._id } });
        return res.json(appointment);
    } catch (error: any) {
        next(error);
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
        await Users.findByIdAndUpdate(appointment?.user, { $pull: { appointments: appointment?._id } });
        await Users.findByIdAndUpdate(appointment?.driver, { $pull: { appointments: appointment?._id } });
        await Families.findByIdAndUpdate(appointment?.family, { $pull: { appointments: appointment?._id } });
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


  