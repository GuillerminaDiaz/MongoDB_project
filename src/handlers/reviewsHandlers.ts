import { createReview } from "../controllers/reviewsControllers";
import { Request, Response } from "express";


export const postReview = async(req: Request, res: Response)=>{
    const info= req.body;
    try {
        const newReview= await createReview(info);
        res.status(200).send(newReview);
    } catch (error) {
        res.status(400).send(error.message);
    }
}