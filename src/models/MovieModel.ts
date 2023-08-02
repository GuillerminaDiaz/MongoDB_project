import mongoose from "mongoose";

const movieSchema= new mongoose.Schema({
    id_movie: {type: Number, required: true},

    title: {type: String, required: true},

    genre: [{type: String}],

    overview: {type: String},

    adult: {type: String},

    language: {type: String},

    image: {type: String},

    poster: {type: String},

    rating: {type: Number, required: true},

    release_date: {type: Date},

    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]

})

export const MovieModel= mongoose.model('Movie', movieSchema)