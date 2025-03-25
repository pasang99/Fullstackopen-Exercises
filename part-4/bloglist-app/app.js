const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const app = express();

// MongoDB connection URL
const mongoUrl = 'mongodb+srv://pasangl046:ysx1rJCRvVurDReo@pasang.q2a89.mongodb.net/?retryWrites=true&w=majority&appName=Pasang'
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(cors());
app.use(express.json());

// Use the blog routes
app.use('/api/blogs', blogRouter);

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});