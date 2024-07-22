// backend/src/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5008;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const deliveryRoutes = require('./routes/deliveries');
const listRoutes = require('./routes/lists');

app.use('/api/deliveries', deliveryRoutes);
app.use('/api/lists', listRoutes);
