const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes'); // Importa o arquivo de rotas principal

const app = express();
const port = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());
app.use('/api', routes); // Usa o arquivo de rotas principal

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
