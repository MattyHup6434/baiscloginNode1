require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes'); 

app.use(bodyParser.json());


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
