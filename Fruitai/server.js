// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const faqRoutes = require('./routes/faq');
require('dotenv').config(); // For environment variables

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// FAQ Routes
app.use('/api/faqs', faqRoutes);

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
