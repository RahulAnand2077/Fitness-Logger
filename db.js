require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {

    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases available:");
    databasesList.databases.forEach(db => {
      console.log(` - ${db.name}`);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {

  }
}


connectToDatabase();

