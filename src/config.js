const envInit = require('dotenv').config;
envInit();

module.exports = {
  appPort: process.env.APP_PORT,
  dbType: process.env.DB_TYPE,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
}
