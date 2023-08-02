import { GenreModel } from "../models/GenreModel";
import axios from "axios";
import 'dotenv/config';

export const getAllGenres= async ()=>{
    const {data}= await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
     
    if(!data) throw Error('Missing info');
    
        for(let genre of data?.genres){
            
            let founded= await GenreModel.findOne({id: genre.id})
            if(!founded){
                const addDB= new GenreModel(genre);
                await addDB.save();
            }
        }
       
        
        return data.genres;
    
}