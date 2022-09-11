const { MongoClient } = require("mongodb");

const dbName = "practica_2";
const accountCollName = "cuentas";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const getAccountsCollection = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(accountCollName);

  return collection;
};

const userExists = async (email) => {
  const collection = await getAccountsCollection();

  await client.connect();
  const res = await collection.findOne({ email });

  return {
    status: res ? true : false,
    res,
  };
};

module.exports = { userExists, client };
