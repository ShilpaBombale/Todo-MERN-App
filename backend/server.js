//backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

