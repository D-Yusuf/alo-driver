import { ObjectId } from 'mongoose';
import Families from '../../models/Family';
import Users from '../../models/User';
import { Request, Response, NextFunction } from 'express';

export const createFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const family = await Families.create({...req.body, members: [req.user._id, ...req.body.members], admins: [req.user._id]})
        
        // update family key for users
        await Users.findByIdAndUpdate(req.body.diver, {family: family._id, familyAdmin: true}, { new: true })
        await Promise.all((family?.members || []).map(async (member) => {
            await Users.findByIdAndUpdate(member, {family: family._id, familyAdmin: family.admins.includes(member)}, { new: true })
        }));
        await Promise.all((family?.drivers || []).map(async (driver) => {
            await Users.findByIdAndUpdate(driver, {family: family._id}, { new: true })
        }));
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
        
        // if the user is not an admin of the family
        if(!family?.admins.includes(req.user._id)) {
            return res.status(403).json({message: "You are not an admin of this family"})
        }
        
        // if the user removed all members from the family
        if(!req.body.members.length) {
            return res.status(403).json({message: "You cannot remove all members from the family"})
        }
        // Remove from user's schema family ID
        await Promise.all((family?.members).map(async (member) => {
            await Users.findByIdAndUpdate(member, {family: null}, { new: true });
        }));
        // Add to user's schema family ID
        await Promise.all(req.body.members.map(async (member: string) => {
            await Users.findByIdAndUpdate(member, {family: family?._id}, { new: true })
        }))

        // if the only admin is the user himself and he left the family 
        if(!req.body.members.includes(req.user._id)) {
            if(family?.admins.length === 1){
                const members = family.members.filter(member => !family.drivers.includes(member))
                const randomMember = members[Math.floor(Math.random() * members.length)]
                if (randomMember) {
                    await Families.findByIdAndUpdate(family._id, { admins: [randomMember] } , { new: true })
                }

            } 
            // remove the user from the family admins
            await Users.findByIdAndUpdate(req.user._id, {familyAdmin: false}, { new: true })
        }
        const newFamily = await Families.findByIdAndUpdate(user?.family, req.body, { new: true })
        return res.json(newFamily)
    } catch (error: any) {
        next(error)
    }
}


export const deleteFamily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Users.findById(req.params.userId)
        const family = await Families.findById(user?.family)
        if(!family?.admins.includes(req.params.userId)) {
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


  