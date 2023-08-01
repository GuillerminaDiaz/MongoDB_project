import moongose from 'mongoose';
import {UserModel} from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

interface IUser{
    username: string;
    email: string;
    password: string;
    age: number;
}

export const newUser= async(info: IUser)=>{
    const password: string = info.password;
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser= new UserModel({
        username: info.username,
        email: info.email,
        password: hashedPassword,
        age: info.age
    });
    await newUser.save();

    const user= await UserModel.find({email: info.email})
    if(!user) throw Error('Create failed');
    return user;
   
}

export const loginUser = async ( email: string, password:string) => {

    const userRepeat = await UserModel.find({ email: email })

    if(!userRepeat){
        throw new Error("User does not exist")
    }

    const userPassword = userRepeat[0].password.toString()

    const response = await bcrypt.compare(password, userPassword)

    if(response ){
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY)
        return token
    }else {
        return "Incorrect password"
    }
}


export const getOneUser= async(id: moongose.Types.ObjectId)=>{
    const user= await UserModel.findById(id).populate('reviews').exec();
    return user;
}