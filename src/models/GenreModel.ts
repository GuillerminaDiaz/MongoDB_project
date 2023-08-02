import mongoose from "mongoose";

const genreSchema= new mongoose.Schema({
    id:{type: Number, required: true},
    name:{type: String, required: true}
})

export const GenreModel= mongoose.model('Genre', genreSchema);