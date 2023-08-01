import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

//salt =>número de dígitos aleatorios que se le agrega a la contraseña ya sea al principio o al final 
//select: false para no obtener el dato cuand hacemos fetch
export const UserModel= mongoose.model('User', UserSchema);

