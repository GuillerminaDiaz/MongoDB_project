import {Router} from 'express';
import { getAllMovies, getOneMovie } from '../handlers/moviesHandler';

const moviesRouter= Router();

moviesRouter.get('/movies', getAllMovies);
moviesRouter.get('/movies/:id', getOneMovie);

export default moviesRouter;
