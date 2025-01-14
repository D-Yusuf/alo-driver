import Appointments from '../../models/Appointment';
import Users from '../../models/User';

import { Request, Response, NextFunction } from 'express';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointments.create(req.body)
        const { userId, driverId, date, time, location, status } = req.body

        await Users.findByIdAndUpdate(userId, { $push: { appointments: appointment._id } })
        await Users.findByIdAndUpdate(driverId, { $push: { appointments: appointment._id } })

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
















// REFRENCE ⬇️

// exports.postsCreate = async (req, res) => {
//     try {
//       if(req.file){
//         console.log(req.file)
//         req.body.file = req.file.path
//       }
//       const newPost = await Post.create(req.body);
//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   exports.postsDelete = async (req, res) => {
//     const { postId } = req.params;
//     try {
//       const foundPost = await Post.findById(postId);
//       if (foundPost) {
//         await foundPost.deleteOne();
//         res.status(204).end();
//       } else {
//         res.status(404).json({ message: "post not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   exports.postsUpdate = async (req, res) => {
//     const { postId } = req.params;
//     try {
//       const foundPost = await Post.findById(postId);
//       if (foundPost) {
//         await foundPost.updateOne(req.body);
//         res.status(204).end();
//       } else {
//         res.status(404).json({ message: "post not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   exports.postsGet = async (req, res) => {
//     try {
//       const posts = await Post.find();
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  