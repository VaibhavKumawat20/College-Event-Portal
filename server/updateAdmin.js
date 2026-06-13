import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

// Delete existing admin
await User.deleteOne({ role: 'admin' });

// Create new admin (password will be hashed by the User model pre-save hook)
await User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    role: 'admin'
});

console.log('Admin updated successfully');
console.log('Email: admin@gmail.com');
console.log('Password: 123456');

process.exit();
