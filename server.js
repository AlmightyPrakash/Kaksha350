const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// MongoDB connection
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/userRoute');
const liveLectureRoutes = require('./routes/liveLectureRoute');
const videoLectureRoutes = require('./routes/videoLectureRoute');  // ✅ Ensure correct path
const liveTestRoutes = require('./routes/liveTestRoute');
const materialRoutes = require('./routes/materialRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/live-lectures', liveLectureRoutes);
app.use('/api/video-lectures', videoLectureRoutes); // ✅ Correct base path for video
app.use('/api/live-tests', liveTestRoutes);
app.use('/api/materials', materialRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Node server running successfully!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
