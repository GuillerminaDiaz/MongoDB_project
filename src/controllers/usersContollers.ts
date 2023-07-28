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