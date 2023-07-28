import mongoose from "mongoose";

const movieSchema= new mongoose.Schema({
    id_movie: {type: Number, required: true},

    title: {type: String, required: true},

    //genre_id: {type: Number, required: true},

    overview: {type: String, required: true},

    adult: {type: String, required: true},

    language: {type: String, required: true},

    image: {type: String, required: true},

    poster: {type: String, required: true},

    rating: {type: Number, required: true},

    release_date: {type: Date, required: true},

})

export const movieModel= mongoose.model('Movie', movieSchema)