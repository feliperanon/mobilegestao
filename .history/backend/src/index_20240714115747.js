// backend/src/index.js

const express = require('express');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const authRoutes = require('../routes/auth');
const analysisRoutes = require('../routes/analysis'); // Certifique-se de ter as rotas de análise

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes); // Adicione as rotas de análise

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
