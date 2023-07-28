import server from './app';
import 'dotenv/config';
import mongoose from 'mongoose';

const PORT= process.env.PORT;
const DB_CONNECTION= process.env.DB_CONNECTION;

mongoose.Promise= Promise;
const connectionDB= async()=>{
    try {
        mongoose.connect(DB_CONNECTION);
        console.log('MongoDB connected');
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}



server.listen(PORT, ()=>{ 
    connectionDB();
    console.log(`Server running on port ${PORT}`);
});