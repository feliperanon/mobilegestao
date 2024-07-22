const express = require('express');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const authRoutes = require('../routes/auth');

dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
