import { newUser } from "../controllers/usersContollers";
import { Response, Request } from "express"

export const getAllUsers= async(req: Request, res: Response)=>{
    res.send('tamo activoo');
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

