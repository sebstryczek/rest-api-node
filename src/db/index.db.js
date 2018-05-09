const fakedbInit = require('./fakedb/index.fakedb');
const mongodbInit = require('./mongodb/index.mongodb');

module.exports = async (config) => {
  switch (config.dbType) {
    case 'mongodb':
      return await mongodbInit(config);
    default:
      return fakedbInit(config);
  }
};
