// backend/src/index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const authRoutes = require('../routes/auth');
const deliveryRoutes = require('../routes/delivery');
const listRoutes = require('../routes/lists');

dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

// Middleware CORS
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/lists', listRoutes);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
