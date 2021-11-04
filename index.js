const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');

// 1.Create a new express server
const app = express();

// 4. Public directory
app.use(express.static('public'));

// 7.CORS
app.use(cors());

// 6.Database
dbConnection();

// 5.Read and parse from body data
app.use(express.json());

// 3.Roots
// authentications
app.use('/api/auth', require('./routes/auth'));
// CURD Event
app.use('/api/events', require('./routes/events'));

// 2.Listen petition to server
app.listen(process.env.PORT, () => {
  console.log(`Server run on PORT ${process.env.PORT}`);
});
