import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import Notice from './models/Notice.js';
import Achievement from './models/Achievement.js';
import User from './models/User.js'; // Needed for Notice 'postedBy'

dotenv.config();

const eventsData = [
    {
        title: "Tech Fest 2026",
        description: "Annual technical festival featuring coding competitions, robotics, and workshops.",
        date: new Date('2026-03-15T09:00:00'),
        time: "09:00 AM",
        venue: "Main Auditorium",
        registrationDeadline: new Date('2026-03-10'),
        bannerUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=2069", // Coding/Tech
        seats: 500,
        registeredCount: 45
    },
    {
        title: "Cultural Night",
        description: "A night of music, dance, and drama performances by students.",
        date: new Date('2026-04-20T18:00:00'),
        time: "06:00 PM",
        venue: "Open Air Theatre",
        registrationDeadline: new Date('2026-04-18'),
        bannerUrl: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=2070", // Concert Lights
        seats: 1000,
        registeredCount: 120
    },
    {
        title: "Hackathon 5.0",
        description: "24-hour coding hackathon to solve real-world problems. Join us for a sprint of innovation.",
        date: new Date('2026-05-10T10:00:00'),
        time: "10:00 AM",
        venue: "CS Department Lab",
        registrationDeadline: new Date('2025-05-05'), // PAST DEADLINE to test "Closed" status
        bannerUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070", // Team working on laptops
        seats: 200,
        registeredCount: 50
    }
];

const noticesData = [
    {
        title: "Mid-Semester Exams Schedule",
        description: "The schedule for the upcoming mid-semester examinations has been released. Please check the notice board.",
        postedDate: new Date(),
        status: "active"
    },
    {
        title: "Holiday on Friday",
        description: "College will remain closed on Friday due to public holiday.",
        postedDate: new Date(),
        status: "active"
    },
    {
        title: "Library Book Return",
        description: "All students are requested to return library books before the semester end.",
        postedDate: new Date(new Date().setDate(new Date().getDate() - 5)), // Posted 5 days ago
        status: "active"
    }
];

const achievementsData = [
    {
        title: "National Robotics Winner",
        description: "Our college team won 1st prize at the National Robotics Championship.",
        mediaUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070", // Robot
        category: "Technical",
        date: new Date('2025-12-15')
    },
    {
        title: "Inter-College Cricket Champions",
        description: "College cricket team lifted the trophy in the state level tournament.",
        mediaUrl: "https://images.unsplash.com/photo-1531415074984-618821df4974?auto=format&fit=crop&q=80&w=2070", // Cricket
        category: "Sports",
        date: new Date('2026-01-20')
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding');

        // Optional: Clear existing data
        // await Event.deleteMany({});
        // await Notice.deleteMany({});
        // await Achievement.deleteMany({});

        // Check for existing user to attach to notices
        const adminUser = await User.findOne({ role: 'admin' });

        // Insert Events
        await Event.insertMany(eventsData);
        console.log('Events Seeded');

        // Insert Notices (Attach user if found)
        const noticesWithUser = noticesData.map(n => ({ ...n, postedBy: adminUser?._id }));
        await Notice.insertMany(noticesWithUser);
        console.log('Notices Seeded');

        // Insert Achievements
        await Achievement.insertMany(achievementsData);
        console.log('Achievements Seeded');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
