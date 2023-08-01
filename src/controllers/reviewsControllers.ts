import { ObjectId } from "mongoose";
import { ReviewModel } from "../models/ReviewModel";
import { UserModel } from "../models/UserModel";
import { MovieModel } from "../models/MovieModel";

interface IReview{
    userId: ObjectId;
    movieId: ObjectId;
    comment: String;
    score: Number;
}
export const createReview= async(info: IReview)=>{
    const newReview= new ReviewModel(info);
    await newReview.save();

    const user= await UserModel.findByIdAndUpdate(
        {_id: info.userId}, 
        { $push: { reviews: newReview} })
        .exec() // Utiliza exec() para manejar la respuesta
        .then(user => {
            console.log(user);
        })
        .catch(error => {
            throw Error('Review creation failed');
        });
    

    const movie= await MovieModel.findByIdAndUpdate(
        {_id: info.movieId}, 
        { $push: { reviews: newReview} }) 
        .exec() 
        .then(movie => {
            console.log(movie);
        })
        .catch(error => {
            throw Error('Review creation failed');
        });
     
    
    return await UserModel.findOne({_id: info.userId});
    

}