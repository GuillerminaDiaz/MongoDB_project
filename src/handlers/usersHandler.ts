import { getOneUser, newUser } from "../controllers/usersContollers";
import { Response, Request } from "express"
import mongoose from "mongoose";

export const fetchUser= async(req: Request, res: Response)=>{
    const {id}= req.params;
    
    try {
        const objId = new mongoose.Types.ObjectId(id);
        const oneUser= await getOneUser(objId)
        res.status(200).send(oneUser);
    } catch (error) {
        res.status(400). send(error.message)
    }
    
}

export const postUser= async(req: Request, res: Response)=>{
    const info= req.body;
    try {
        const user= await newUser(info)
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
}

