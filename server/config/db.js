import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('\x1b[31m%s\x1b[0m', '---------------------------------------------------');
        console.error('\x1b[31m%s\x1b[0m', 'FATAL ERROR: Could not connect to MongoDB.');
        console.error('\x1b[31m%s\x1b[0m', 'Please ensure your MongoDB server is RUNNING.');
        console.error('\x1b[31m%s\x1b[0m', 'Run "mongod" in a terminal or start MongoDB Compass.');
        console.error('\x1b[31m%s\x1b[0m', '---------------------------------------------------');
        process.exit(1);
    }
};

export default connectDB;
