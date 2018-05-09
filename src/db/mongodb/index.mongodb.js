const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const mongoClient = mongodb.MongoClient;

module.exports = async config => {
  const { dbUser, dbPass, dbHost, dbPort, dbName } = config;
  const connString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
  const client = await mongoClient.connect(connString);
  const db = client.db(dbName);
  
  return {
    list: async modelName => {
      return await db.collection( modelName ).find().toArray();
    },
    create: async (modelName, params) => {
      const insertResult = await db.collection('words').insert( params );
      return await db.collection('words').findOne( {_id: insertResult.insertedIds[0]} );
    },
    select: async (modelName, id) => {
      return await db.collection('words').findOne( {_id: new ObjectID(id)} );
    },
    delete: async (modelName, id) => {
      const deleteResult = await db.collection('words').deleteOne( {_id: new ObjectID(id)} );
      if (deleteResult.deletedCount === 0) {
        return null;
      }
      return { message: "Item deleted" };
    },
    update: async (modelName, id, params) => {
      const updateResult = await db.collection('words').updateOne( {_id: new ObjectID(id)}, params );
      return await db.collection('words').findOne( {_id: new ObjectID(id)} );
    }
  }
}

