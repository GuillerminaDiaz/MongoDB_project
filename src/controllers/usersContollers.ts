import moongose from 'mongoose';
import {UserModel} from '../models/UserModel'

interface IUser{
    username: String;
    email: String;
    age: Number;
}
export const newUser= async(info: IUser)=>{
    const newUser= new UserModel(info);
    
    await newUser.save();
    return newUser;
   
}

export const getOneUser= async(id: moongose.Types.ObjectId)=>{
    const user= await UserModel.findById(id).populate('reviews').exec();
    return user;
}