const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/lists/entregadores', require('./routes/entregadores'));
app.use('/api/lists/clientes', require('./routes/clientes'));
app.use('/api/deliveries', require('./routes/deliveries'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const port = process.env.PORT || 5008;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
