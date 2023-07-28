import {Router} from 'express';
import { getAllMovies } from '../handlers/moviesHandler';

const moviesRouter= Router();

moviesRouter.get('/movies', getAllMovies);

export default moviesRouter;
