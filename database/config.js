const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('dbOnline');
  } catch (error) {
    console.log(error);
    throw new Error('Error: it is not possible to connect to MongoDB');
  }
};

module.exports = { dbConnection };
