import Users from '../../models/User';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from '../../middleware/passport';

const createToken = (user: any) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}   
const encryptPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const encryptedPassword = await encryptPassword(req.body.password)
        const user = await Users.create({ ...req.body, password: encryptedPassword })
        const token = createToken(user)
        return res.json({ token, user })
    } catch (error: any) {
        next(error)
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { phoneNumber, password } = req.body
    const user = await Users.findOne({ phoneNumber })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid password" })
    }
    const token = createToken(user)
    return res.json({token, user})
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
  