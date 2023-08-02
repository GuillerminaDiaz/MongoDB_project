import { allMovies, fetchMovie, getApiMovies } from '../controllers/moviesControllers';
import {Response, Request} from 'express';
import mongoose from 'mongoose';

export const getAllMovies= async(req:Request, res: Response)=>{
    try {
        const movies= await allMovies();
        res.status(200).send(movies);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const getOneMovie= async(req: Request, res: Response)=>{
    const {id}= req.params;
    try {
        const objId = new mongoose.Types.ObjectId(id);
        const movie= await fetchMovie(objId);
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error.message)
    }
}