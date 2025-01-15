import Families from '../../models/Family';
import Users from '../../models/User';
import { Request, Response, NextFunction } from 'express';

export const createFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const family = await Families.create({...req.body, members: [req.user._id, ...req.body.members], admins: [req.user._id]})
        await Users.findByIdAndUpdate(req.user._id, {family: family._id}, { new: true })
        return res.json(family)
    } catch (error: any) {
        next(error)
    }
}

export const getFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Users.findById(req.params.userId)
        const family = await Families.findById(user?.family)
        return res.json(family)
    } catch (error: any) {
        next(error)
    }
}

export const updateFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Users.findById(req.user._id)
        const family = await Families.findById(user?.family)
        if(!family?.admins.includes(req.user._id)) {
            return res.status(403).json({message: "You are not an admin of this family"})
        }
        if(!req.body.members?.includes(req.user._id)) {
            return res.status(403).json({message: "You cannot remove yourself from the family"})
        }
        await Families.findByIdAndUpdate(user?.family, req.body, { new: true })
        return res.json(family)
    } catch (error: any) {
        next(error)
    }
}


export const deleteFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Users.findById(req.params.userId)
        const family = await Families.findById(user?.family)
        if(!family?.admins.includes(req.user._id)) {
            return res.status(403).json({message: "You are not an admin of this family"})
        }
        await Families.findByIdAndDelete(family?._id)
        await Users.findByIdAndUpdate(req.params.userId, {family: null}, { new: true })
        return res.json(family)

    } catch (error: any) {
        next(error)
    }
}


export const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const families = await Families.find()
        return res.json(families)
    } catch (error: any) {
        next(error)
    }
}


  