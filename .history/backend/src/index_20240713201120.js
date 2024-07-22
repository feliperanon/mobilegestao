// backend/src/index.js

const express = require('express');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('../routes/auth'));
app.use('/api/deliveries', require('../routes/deliveries'));
app.use('/api/history', require('../routes/history'));
app.use('/api/analysis', require('../routes/analysis'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
