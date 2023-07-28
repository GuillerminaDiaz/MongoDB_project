import axios from 'axios';
import 'dotenv/config';
import { IApiMovie } from 'interfaces/interface';
import { movieModel } from '../models/MovieModel';

export const getApiMovies= async()=>{
    let apiMovies: IApiMovie[]=[];
    try {
        let i = 0;
        //while(i<3){
        const response= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
        if(!response) throw new Error ('no hay respuesta')
        for(let movie of response.data.results){

            let dbMovie= await movieModel.findOne({ id_movie: movie.id})

            if(!dbMovie){
                apiMovies.push(
                    {
                        id_movie: movie.id,
                        title: movie.title ,
                        //genre_id
                        overview: movie.overview ,
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
        //i++;   
        //}
    //console.log(apiMovies);
    for(let film of apiMovies){
        let movieDB = new movieModel(film)
        await movieDB.save();
    }
    return apiMovies;

    } catch (error) {
          console.log(error.message)      
    }
    
}

export const getDBMovies= async()=>{
    const dbMovies= await movieModel.find();
    return dbMovies;
}

export const allMovies= async()=>{
    const api= await getApiMovies();
    const db= await getDBMovies();
    return [...db, ...api];
}