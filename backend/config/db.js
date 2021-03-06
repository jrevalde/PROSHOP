import mongoose from "mongoose";

const connectDB = async () =>
{
    try
    {
        const connect = await mongoose.connect(process.env.MONGO_URI); // we use await because this method returns a promise

        console.log(`MongoDB is connected ${connect.connection.host}`)
    } 
    catch (error)
    {
        console.error(`Error: ${error}`);
        process.exit(1); //the 1 means it will exit with failure.
    }
}

export default connectDB;