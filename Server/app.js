const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const subredditRoutes = require('./routes/subredditRoutes'); // Import subreddit routes

dotenv.config();

const app = express();

// Enable CORS for frontend integration
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Database connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Successful");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

main();

// Define routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/posts', postRoutes); // Post-related routes
app.use('/users', userRoutes); // User-related routes
app.use('/subreddits', subredditRoutes); // Subreddit-related routes

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
