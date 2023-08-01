import axios from 'axios';
import 'dotenv/config';
import { IApiMovie } from 'interfaces/interface';
import { MovieModel } from '../models/MovieModel';
import mongoose from 'mongoose';

export const getApiMovies= async()=>{
    let apiMovies: IApiMovie[]=[];
    console.log('entrre al controller');
    try {
        let i = 1;
        while(i<11){
        const response= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=`+i)
        if(!response) throw new Error ('no hay respuesta')
        for(let movie of response.data.results){

            let dbMovie= await MovieModel.findOne({ id_movie: movie.id})

            if(!dbMovie){
                apiMovies.push(
                    {
                        id_movie: movie.id,
                        title: movie.title ,
                        //genre_id
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
    // console.log('entrre al try');
    // let i = 1;
    // // while(i<3){
    // const options = {
    //     method: 'GET',
    //     url: 'https://api.themoviedb.org/3/movie/popular?page=2',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'Bearer 5ef783f42c190d86cc87dd898977a099'
    //     }
    //   };

    
    //   const response = await axios.request(options)
    //                             .then(function (res:any){console.log('estoy en axios');
    //                             })
    //                             .catch(function (err:any) {return (err)});
    //     const {data} = response
    //     console.log(data);
            
           
        // for(let movie of data?.results){

        //             let dbMovie= await MovieModel.findOne({ id_movie: movie.id})
        
        //             if(!dbMovie){
        //                 apiMovies.push(
        //                     {
        //                         id_movie: movie.id,
        //                         title: movie.title ,
        //                         //genre_id
        //                         overview: movie.overview ,
        //                         adult: movie.adult ,
        //                         language: movie.original_language ,
        //                         image: movie.backdrop_path ,
        //                         poster: movie.poster_path ,
        //                         rating: movie.vote_average ,
        //                         release_date: movie.release_date ,
        //                     })
        //                 } 
        //                 ;
        //             }
        
        
    //     i++;
    // }

    for(let film of apiMovies){
        let movieDB = new MovieModel(film)
        await movieDB.save();
    }
    // await data?.results.map( (e:any)=> {
    //     console.log(e.title)
    // })
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