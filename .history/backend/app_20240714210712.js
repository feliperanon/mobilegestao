const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const deliveryRoutes = require('./routes/delivery');
const listRoutes = require('./routes/lists');

const app = express();
const port = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());

app.use('/api', deliveryRoutes);
app.use('/api', listRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
