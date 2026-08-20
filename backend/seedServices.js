const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

// Force Google DNS for Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const serviceSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    duration: String,
    description: String,
    rating: Number
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

const services = [
    {
        title: 'Web Development Consultation',
        category: 'Development',
        price: 99,
        duration: '60 mins',
        description: 'One-on-one strategy session for full-stack web architectures and UI design.',
        rating: 4.9
    },
    {
        title: 'SaaS Architecture Review',
        category: 'Technical',
        price: 149,
        duration: '90 mins',
        description: 'Deep dive code inspection, security checks, and database performance tuning.',
        rating: 5.0
    },
    {
        title: 'UI/UX Design Audit',
        category: 'Design',
        price: 79,
        duration: '45 mins',
        description: 'Comprehensive review of your landing page responsiveness, theme gradients, and user flows.',
        rating: 4.8
    }
];

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected!');

        await Service.deleteMany({});
        await Service.insertMany(services);

        console.log('Services Sample Data Successfully Added!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }
};

seedData();