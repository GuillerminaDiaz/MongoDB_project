import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    comment:{
        type: String,
        required: true
    },
    score:{
        type: mongoose.Schema.Types.Decimal128

    }
});

export const ReviewModel= mongoose.model('Review', reviewSchema)