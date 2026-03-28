import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const existing = await User.findOne({ email: 'admin@college.com' });
if (existing) {
    console.log('Admin already exists');
} else {
    await User.create({ name: 'Admin', email: 'admin@college.com', password: 'Admin1234', role: 'admin' });
    console.log('Admin created successfully');
}

process.exit();
