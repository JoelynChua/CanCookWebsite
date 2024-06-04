require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { handleError } = require('./utils/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});