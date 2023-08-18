import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/crudtype',
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey12345',
};
