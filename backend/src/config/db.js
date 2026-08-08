import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error("error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    }
}


// shambhavisoni2020_db_user
// HjkO0CRJtKZB4EJu