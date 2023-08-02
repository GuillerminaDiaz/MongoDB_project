import axios from 'axios';
import 'dotenv/config';
import { IApiMovie } from 'interfaces/interface';
import { MovieModel } from '../models/MovieModel';
import mongoose from 'mongoose';
import { getAllGenres } from './genresController';
import { GenreModel } from '../models/GenreModel';

export const getApiMovies= async()=>{
    const genres= await getAllGenres();
   
    let apiMovies: IApiMovie[]=[];
    
    try {
        let i = 1;
        while(i<11){
        const response= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=`+i)
        if(!response) throw new Error ('no hay respuesta')
        
        for(let movie of response.data.results){

            let dbMovie= await MovieModel.findOne({ id_movie: movie.id})

            if(!dbMovie){
           
            let movieGenres=[];
                for(let genId of genres){
                    for(let i=0; i< movie.genre_ids.length; i++){
                        if(movie.genre_ids[i]=== genId.id){
                            movieGenres.push(genId.name)
                        }
                    }
                   
                }
                apiMovies.push(
                    {
                        id_movie: movie.id,
                        title: movie.title ,
                        genre: movieGenres,
                        overview: movie.overview? movie.overview : 'no overview' ,
                        adult: movie.adult ,
                        language: movie.original_language ,
                        image: movie.backdrop_path ,
                        poster: movie.poster_path ,
                        rating: movie.vote_average ,
                        release_date: movie.release_date ,
                    })
                } 
                ;
            }
            
        i++;   
        }
    

    for(let film of apiMovies){
        let movieDB = new MovieModel(film)
        await movieDB.save();
    }
   
    return apiMovies;

    } catch (error) {
          console.log(error)      
    }
    
}

export const getDBMovies= async()=>{
    const dbMovies= await MovieModel.find();
    return dbMovies;
}

export const allMovies= async()=>{
    const api= await getApiMovies();
    const db= await getDBMovies();
    return [...db, ...api];
}

export const fetchMovie= async(id: mongoose.Types.ObjectId)=>{
    const oneMovie= await MovieModel.findById(id).populate('reviews').exec();
    return oneMovie;
}