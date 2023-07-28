import { allMovies } from '../controllers/moviesControllers';
import {Response, Request} from 'express';

export const getAllMovies= async(req:Request, res: Response)=>{
    try {
        const movies= await allMovies();
        res.status(200).send(movies);
    } catch (error) {
        res.status(400).send(error.message)
    }
}